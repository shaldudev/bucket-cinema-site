import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { game } from '../index';
const prisma = new PrismaClient();

type Progress = {
    currValue: number
    minValue: number
    maxValue: number
    speed: number
    increment: number
}

const getProgress = async (req: Request, res: Response) => {
    const currentTime = game.getCurrentTime();
    const maxTime = game.getMaxTime();

    try {
        res.json({ "progress": {
            currValue: currentTime,
            minValue: 0,
            maxValue: maxTime,
            speed: 1,
            increment: 1
        }});       
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong' });
        console.log(err);
    }
}

export { getProgress };