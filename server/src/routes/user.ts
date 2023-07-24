const router = require('express').Router();
import { Request, Response } from 'express';
import { getUser, steamAuth } from '../controllers/user';
import isUserAuth from '../middleware/user';
import passport from 'passport';

router.get('/auth/steam', passport.authenticate('steam', { failureRedirect: '/' }));

router.get('/auth/steam/return', passport.authenticate('steam', { failureRedirect: '/' }),
    (req: Request, res: Response) => {
        steamAuth(req, res);
    });

router.get('/:steamId', isUserAuth, getUser)

export default router;