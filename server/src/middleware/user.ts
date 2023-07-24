import express, { NextFunction, Request, Response } from 'express';
import { isTokenAuth } from './auth';
import { User } from '@prisma/client';

/**
 * Checks if the user is authenticated to read the data
 * The User needs a valid session / logged in, and the given API token must be valid.
 * THIS DOES NOT CHECK IF THE USER IS THE OWNER OF THE DATA
 */
export default async function isUserAuth(req: Request, res: Response, next: NextFunction) {    

    if (await isTokenAuth(req)) {
        
        const sessionId = req.headers.sessionid;
        const userId = req.headers.userid;
       
        if (sessionId && userId) {
            next();
            return;
        }
    }
    res.sendStatus(403);
}
