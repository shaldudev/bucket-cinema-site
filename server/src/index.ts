import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import userRoutes from './routes/user';
import leaderboardRoutes from './routes/leaderboard';
import gameRoutes from './routes/game';
import passport from 'passport';
import initSteam from './steam';
import session from 'express-session';
import https from 'https';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import Game from './game';

const prisma = new PrismaClient();
require('dotenv').config();
const HOST = process.env.HOST;
const MODE = process.env.MODE || 'dev';
const SESSION_KEY = process.env.SESSION_KEY || 'local';

const app = express();
const port = process.env.PORT || 3000;
const SERVER_ROOT = process.env.SERVER_ROOT || '/';

export const game = new Game();

const serverBoot = async () => {
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    //Init Steam passport, aka Steam authentification
    initSteam();

    //Init session
    app.use(
        session({
            secret: SESSION_KEY,
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 24 * 60 * 60 * 1000 * 3, // 3 days
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    //Add all routes here
    app.use('/user', userRoutes);
    app.use('/leaderboard', leaderboardRoutes);
    app.use('/game', gameRoutes);

    app.use('/createDummy', (req: Request, res: Response) => {

        const createUser = async () => {
            const randomName = Math.random().toString(36).substring(7);
            const randomId = Math.floor(Math.random() * 1000000);
            const user = await prisma.user.create({
                data: {
                    steamId: randomId.toString(),
                    username: randomName,
                    avatar: "",
                    currency: {
                        create: {
                            credits: 1000,
                            passiveIncome: 100,
                        }
                    }
                },
            });
        }

        for (let i = 0; i < 100; i++) {
            createUser();
        }

        res.json({ "message": "done, created 100 entries" });
    });

    
    
    let options = {};
    if (MODE == 'prod') {
        console.log('🚀 Production mode');

        options = {
            key: fs.readFileSync(SERVER_ROOT + '/key.key'),
            cert: fs.readFileSync(SERVER_ROOT + '/crt.crt'),
        };


        const server = https.createServer(options, app);

        server.listen(port, () => {
            console.log(`🚀 Express running on ${HOST}`);
        });
    } else {

        app.listen(port, () => {
            console.log(`🚀 Express running on ${HOST}`);
        });
    }



};

serverBoot();