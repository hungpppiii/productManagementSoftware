import Router from 'express';
import { verifyAdmin, verifyToken } from 'middlewares';
import { getMe, login } from './controller';

const router = Router();

router.get('/me', [verifyToken], getMe);
router.post('/login', login);

export default router;
