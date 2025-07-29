import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const getSkills = async (req: Request, res: Response) => {
  try {
    const { search = '', level, sortBy = 'name', sortOrder = 'asc', page = '1', limit = '10' } = req.query;

    const where: any = {
      userId: (req as any).user.id,
      ...(search && {
        name: {
          contains: search.toString(),
          mode: 'insensitive',
        },
      }),
      ...(level && { level: parseInt(level.toString()) }),
    };

    const skills = await prisma.skill.findMany({
      where,
      orderBy: {
        [sortBy.toString()]: sortOrder === 'desc' ? 'desc' : 'asc',
      },
      skip: (parseInt(page.toString()) - 1) * parseInt(limit.toString()),
      take: parseInt(limit.toString()),
    });

    const total = await prisma.skill.count({ where });

    res.json({
      data: skills,
      total,
      page: parseInt(page.toString()),
      limit: parseInt(limit.toString()),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

export const addSkill = async (req: Request, res: Response) => {
  try {
    const { name, level } = req.body;
    const userId = (req as any).user.id;
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