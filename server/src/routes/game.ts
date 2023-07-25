const router = require('express').Router();
import { getProgress } from '../controllers/game';
import isUserAuth from '../middleware/user';

router.get('/progress', isUserAuth, getProgress);


export default router;