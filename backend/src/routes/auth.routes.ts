import { Router } from 'express';
import { signup, login, getMe, logout } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);

router.get('/me', getMe);


export default router;