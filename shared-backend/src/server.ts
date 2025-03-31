import express, { Request, Response } from 'express';
import cors from 'cors';
import { signUp, login, getSession } from './authService';
import { fetchProductById, fetchProducts } from './productService';
import { addToCart, getCart } from './cartService';
import { placeOrder, getOrders } from './orderService';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
});

app.post('/api/signup', async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const data = await signUp(email, password);
    res.json(data);
});

app.get('/api/products', async (req: Request, res: Response) => {
    const products = await fetchProducts();
    res.json(products);
});

app.get('/api/product/:id', async (req: Request, res: Response) => {
    const product = await fetchProductById(req.params.id);
    res.json(product);
});

app.post('/api/cart/add', async (req: Request, res: Response) => {
    const { userId, productId, quantity } = req.body;
    const data = await addToCart(userId, productId, quantity);
    res.json(data);
});

app.get('/api/cart', async (req: Request, res: Response) => {
    const { userId } = req.query;
    const data = await getCart(userId as string);
    res.json(data);
});

app.post('/api/order', async (req: Request, res: Response) => {
    const { userId, totalPrice } = req.body;
    const data = await placeOrder(userId, totalPrice);
    res.json(data);
});

app.get('/api/orders', async (req: Request, res: Response) => {
    const { userId } = req.query;
    const data = await getOrders(userId as string);
    res.json(data);
});

app.get('/api/session', async (req: Request, res: Response) => {
    const session = await getSession();
    res.json(session);
});

app.listen(3001, () => console.log('Backend läuft auf http://localhost:3001'));