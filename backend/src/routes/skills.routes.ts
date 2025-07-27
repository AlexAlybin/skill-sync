import { Router } from 'express';
import { addSkill, deleteSkill, getSkills, updateSkill } from '../controllers/skills.controller';

const router = Router();

router.get('/', getSkills);

router.post('/', addSkill);

router.put('/:id', updateSkill);

router.delete('/:id', deleteSkill);

export default router;
