import { Request, Response } from "express";
import { PrismaClient, User } from '@prisma/client';
require('dotenv').config();

const WEB_HOST = process.env.WEB_HOST || '';
const DOMAIN = process.env.DOMAIN || '';
const prisma = new PrismaClient();

const steamAuth = async (req: Request, res: Response) => {
    const user = req.user as User;
    const sessionId = req.sessionID as string;

    //if the sessionId is not in the session table, add it
    const session = await prisma.session.findUnique({
        where: { sessionId: sessionId }
    });

    if (!session) {
        await prisma.session.create({
            data: {
                sessionId: sessionId,
                userId: user.id,
            }
        });
    }

    res.cookie('sessionid', sessionId, { domain: ('.' + DOMAIN) });
    res.cookie('userid', user.id, { domain: ('.' + DOMAIN) });
    res.status(200).redirect(WEB_HOST);
};

const getUser = async (req: Request, res: Response) => {
    const steamId = req.params.steamId ?? '';
    const userId = req.params.userId ?? '';
    const sessionId = req.headers.sessionid as string;

    let id = '';
    //check if either steamId or userId is provided
    if (steamId) {
        id = steamId;
    } else if (userId) {
        id = userId;
    } else {
        res.status(400).json({ error: 'No steamId or userId provided' });
        return;
    }

    const user = await prisma.user.findMany({
        where: {
            OR: [
                {
                    steamId: id
                },
                {
                    id: id
                }
            ],
        }, include: {
            sessions: true
        }
    });

    let authenticated = false;

    if (user.length === 0) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    
    const sessions = user[0].sessions;
    
    //check if the session id is in the sessions table
    const session = sessions.find((session) => session.sessionId === sessionId);
    if (session) {
        authenticated = true;
    }
    
    const rank = await getUserRank(user[0]);

    res.json({ user:{... user[0] as User, rank, sessions: undefined, lastLogin: undefined, createdAt: undefined, id: undefined}, authenticated });
};

const getUserRank = async (user: User) => {
    const userRank = await prisma.user.count({
        where: {
            OR: [
                {
                  credits: {
                    gt: user.credits,
                  },
                },
                {
                  credits: user.credits,
                  id: {
                    gt: user.id,
                  },
                },
              ],
        }
    });

    return userRank + 1;
}


export { getUser, steamAuth, getUserRank };
