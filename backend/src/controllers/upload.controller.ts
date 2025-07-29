// backend/controllers/uploadBusboy.ts
import { Request, Response } from 'express';
import Busboy from 'busboy';
import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { parseXLSFileToSkills } from '../utils/parseXls';
import { ensureUploadsDir } from '../utils/fsUtils';

const prisma = new PrismaClient();

export const handleSkillUpload = (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });

    const busboy = Busboy({ headers: req.headers });
    let uploadPath = '';

    busboy.on('file', (_name, file, info) => {
        const { filename } = info;
        const uploadsDir = ensureUploadsDir();
        const savePath = path.join(uploadsDir, `${Date.now()}-${filename}`);
        uploadPath = savePath;

        const writeStream = fs.createWriteStream(savePath);
        file.pipe(writeStream);
    });

    busboy.on('finish', async () => {
        try {
            console.log("Parsed FINISH:", uploadPath);
            const skills = parseXLSFileToSkills(uploadPath);
            const validSkills = skills.filter((s: { name: any; level: any; }) => s.name && s.level);

            console.log("Parsed skills:", {skills,validSkills});

              await prisma.skill.createMany({
                data: validSkills.map((skill: { name: any; level: any; }) => ({
                  name: skill.name,
                  level: skill.level,
                  userId,
                })),
              });

              fs.unlinkSync(uploadPath);
              res.json({ message: 'Skills uploaded', count: validSkills.length });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Failed to process uploaded file' });
        }
    });

    req.pipe(busboy);
};
