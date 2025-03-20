import { useState, useEffect } from "react";

export default function CartComponent({ userId }) {
  const [cartItems, setCartItems] = useState([]);

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
          setCartItems(updatedCartItems);
        });
      });
  }, [userId]);

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
    </div>
  );
}
