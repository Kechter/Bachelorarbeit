import express, { Request, Response } from 'express';
import cors from 'cors';
import { signUp, login, logout, getSession } from './authService';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/signup', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await signUp(email, password);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(3001, () => console.log('Backend läuft auf http://localhost:3001'));
