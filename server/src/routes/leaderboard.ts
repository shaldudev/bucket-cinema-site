const router = require('express').Router();
import { Request, Response } from 'express';
import authenticateToken from '../middleware/auth';
import { getLeaderboard, cloneUser } from '../controllers/leaderboard';

router.get('/clone', cloneUser);
router.get('/', authenticateToken, getLeaderboard);


export default router;