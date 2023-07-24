import express, { NextFunction, Request, Response } from 'express';
const jwt = require('jsonwebtoken');
require('dotenv').config();

const origins = process.env.ORIGINS?.split(',') || ['http://localhost:19006'];


// JWT verification middleware
export default function authenticateToken(req: Request, res: Response, next: NextFunction) {

    isTokenAuth(req).then((isAuth) => {
        if (isAuth) {
            next();
        } else {
            res.sendStatus(401);
        }
    });
}

// JWT verification function 
export async function isTokenAuth(req: Request){
    
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    //FOR DEBUGGING
    return true;

    if (token == null) {
        return false;
    }
    
    // Access specific header values
    const reqOrigin = req.headers['origin'] as string;
    const reqReferer = req.headers['referer'] as string;
    
    // Check if the origin is allowed
    if (!origins.includes(reqOrigin) && !origins.includes(reqReferer)) {
        return false;
    }
    
    const jwrsp = await jwt.verify(token, process.env.JWT_SECRET, (err: Error) => {return err});
    if (jwrsp != null){
        return false;
    }
    
    return true;
}
