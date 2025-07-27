import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getSkills = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user.id;
    const skills = await prisma.skill.findMany({ where: { userId } });
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  const { name, level } = req.body;
  const userId = req.body.user.id;

  try {
    const skill = await prisma.skill.create({
      data: { name, level, userId },
    });
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, level } = req.body;

  try {
    const skill = await prisma.skill.update({
      where: { id },
      data: { name, level },
    });
    res.json(skill);
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.skill.delete({ where: { id } });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};