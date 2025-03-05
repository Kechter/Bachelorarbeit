import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const userId = 'df992ef6-af8d-4d4d-8f50-1214b7520dcf';

    useEffect(() => {
        fetch(`http://localhost:3001/api/cart?userId=${userId}`)
            .then((res) => res.json())
            .then((cartData) => {
                console.log('Cart data:', cartData); 

                const productDetailsPromises = cartData.map((item) =>
                    fetch(`http://localhost:3001/api/product/${item.product_id}`)
                        .then((res) => res.json())
                        .then((productData) => {
                            console.log('Product data:', productData); 
                            const product = productData[0]; 
                            item.productName = product.name;
                            item.price = product.price;
                            return item;
                        })
                );

                Promise.all(productDetailsPromises).then((updatedCartItems) => {
                    console.log('Updated cart items:', updatedCartItems); 
                    setCartItems(updatedCartItems);
                });
            });
    }, []);

    return (
        <div>
            <h2>Cart</h2>
            {cartItems.map((item) => (
                <div key={item.id}>
                    <h3>{item.productName}</h3>
                    <p>${item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                </div>
            ))}
            <button onClick={() => navigate('/products')}>Go to Products</button>
            <button onClick={() => navigate('/checkout')}>Go to Checkout</button>
        </div>
    );
}