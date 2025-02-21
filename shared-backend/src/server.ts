import express, { Request, Response } from 'express';
import cors from 'cors';
import { signUp, login, logout, getSession } from './authService';
import { fetchProducts } from './productService';

const app = express();
app.use(cors());
app.use(express.json());


app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
  }
});

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

app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else { 
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

app.listen(3001, () => console.log('Backend läuft auf http://localhost:3001'));
