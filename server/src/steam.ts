import { PrismaClient, User } from '@prisma/client';

const passport = require('passport');
const passportSteam = require('passport-steam');
const SteamStrategy = passportSteam.Strategy;
const prisma = new PrismaClient();

require('dotenv').config();
const STEAM_KEY = process.env.STEAM_KEY;
const HOST = process.env.HOST;

export default async function initSteam() {

    // Required to get data from user for sessions
    passport.serializeUser((user: User, done: any) => {
        done(null, user);
    });

    passport.deserializeUser((user: User, done: any) => {
        done(null, user);
    });

    // Initiate Strategy
    passport.use(new SteamStrategy({
        returnURL: HOST + '/user/auth/steam/return',
        realm: HOST + '/',
        apiKey: STEAM_KEY
    }, async (identifier: any, profile: any, done: any) => {

        let user = await prisma.user.findUnique({
            where: { steamId: profile.id },
        });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    steamId: profile.id,
                    username: profile.displayName,
                    avatar: profile.photos[2].value,
                    currency: {
                        create: {
                            credits: 1000,
                            passiveIncome: 100,
                        }
                    }
                },
            });
        } else {
            //Update user
            user = await prisma.user.update({
                where: { steamId: profile.id },
                data: {
                    username: profile.displayName,
                    avatar: profile.photos[2].value,
                    lastLogin: new Date(),
                },
            });
        }

        return done(null, user);
    }
    ));
}
