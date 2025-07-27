import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes';
import skillsRoutes from './routes/skills.routes';

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true, // 👈 Allow cookies
  })
);

app.use(express.json());

app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/skills', skillsRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
