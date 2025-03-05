import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

    useEffect(() => {
        fetch(`http://localhost:3001/api/cart?userId=${userId}`)
        .then((res) => res.json())
        .then((cartData) => {
            const productDetailsPromises = cartData.map((item) =>
                fetch(`http://localhost:3001/api/product/${item.product_id}`)
                    .then((res) => res.json())
                    .then((productData) => {
                        const product = productData[0]; 
                        item.productName = product.name;
                        item.price = product.price;
                        return item;
                    })
            );

            Promise.all(productDetailsPromises).then((updatedCartItems) => {
                console.log('Updated cart items:', updatedCartItems); 
                setCartItems(updatedCartItems);
                const total = updatedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
                setTotalPrice(total);
            });
        });
    }, []);

    return (
        <div>
            <h2>Checkout</h2>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.productName}</h3>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button onClick={() => navigate('/products')}>Go to Products</button>
            <button onClick={() => navigate('/cart')}>Go to Cart</button>
            <section className="payment-info">
                <h2>Payment Information</h2>
                <div>
                    <label htmlFor="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" value="1234 5678 9012 3456" readOnly />
                </div>
                <div>
                    <label htmlFor="expiryDate">Expiry Date</label>
                    <input type="month" id="expiryDate" value="2025-12" readOnly />
                </div>
                <div>
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" value="123" readOnly />
                </div>
            </section>
            <div className="checkout-button">
                <button>Proceed to Payment</button>
            </div>
        </div>
    );
}