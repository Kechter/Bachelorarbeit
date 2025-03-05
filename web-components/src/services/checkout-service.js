export class CheckoutService {
    async fetchCart(userId) {
        const response = await fetch(`http://localhost:3001/api/cart?userId=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch cart items');
        }
        return response.json();
    }
}
