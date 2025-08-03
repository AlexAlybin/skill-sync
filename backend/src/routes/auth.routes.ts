import { Router } from 'express';
import { getUser } from '../controllers/auth.controller';

const router = Router();

// router.post('/signup', signup);

router.post('/getUser', getUser);


export default router;