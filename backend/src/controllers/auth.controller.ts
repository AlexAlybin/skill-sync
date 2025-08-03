import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

// export const signup = async (req: Request, res: Response) => {
//   const { email, password, name } = req.body;
//   try {
//     const existingUser = await prisma.user.findUnique({ where: { email } });
//     if (existingUser) return res.status(400).json({ message: 'User already exists' });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: { email, name, password: hashedPassword },
//     });

//     const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

//     res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false });
//     res.status(201).json({ user: { id: user.id, email: user.email, name: user.name } });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', err });
//   }
// };

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log("getUser action called", { req: req.body });
    const { email } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
