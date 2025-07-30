import express from 'express';
import { handleSkillUpload } from '../controllers/upload.controller';

const router = express.Router();

router.post('/skills', handleSkillUpload);

export default router;
