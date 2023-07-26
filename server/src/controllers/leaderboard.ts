import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type LeaderboardUser = {
    avatar: string,
    username: string,
    credits: number,
    rank: number,
}


const getLeaderboard = async (req: Request, res: Response) => {

    try {
        const users = await prisma.user.findMany({
            select: {
                steamId: true,
                username: true,
                avatar: true,
                currency: {
                    select: {
                        credits: true
                    }
                }
            },
            orderBy: [
                {
                    currency: {
                        credits: 'desc'
                    }
                },
                {
                    id: 'desc'
                }
            ],
            take: 100,
        });

    const leaderboardUsers: LeaderboardUser[] = users.map((user, index) => {
        return {
            steamId: user.steamId,
            avatar: user.avatar,
            username: user.username,
            credits: user.currency?.credits ?? 0,
            rank: index + 1
        }
    });

    res.json({ "users": leaderboardUsers });
} catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
    console.log(err);
}
}

//REMEMBER TO REMOVE THIS :)
const cloneUser = async (req: Request, res: Response) => {
    const steamId = '76561198084667110'

    //get the user from the database
    const user = await prisma.user.findUnique({
        where: {
            steamId: steamId
        }
    });

    for (let i = 0; i < 100; i++) {
        await createUser(user);
    }

    res.json({ "message": "done" });

}
async function createUser(user: any) {

    let newSteamId = Math.floor(Math.random() * 1000000);
    await prisma.user.create({
        data: {
            steamId: newSteamId.toString(),
            username: (user?.username ?? '') + Math.floor(Math.random() * 209),
            avatar: user?.avatar ?? '',
            currency: {
                create: {
                    credits: 1000,
                }
            }
        }, include: {
            currency: true
        }
    });
}

export { getLeaderboard, cloneUser };