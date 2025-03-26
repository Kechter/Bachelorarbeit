import { useState, useEffect } from "react";

export default function CartComponent({ userId }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/cart?userId=${userId}`)
      .then((res) => res.json())
      .then((cartData) => {
        const grouped = {};
        cartData.forEach((item) => {
          if (!grouped[item.product_id]) {
            grouped[item.product_id] = { ...item, quantity: 1 };
          } else {
            grouped[item.product_id].quantity += 1;
          }
        });

        const groupedItems = Object.values(grouped);

        const productDetailsPromises = groupedItems.map((item) =>
          fetch(`http://localhost:3001/api/product/${item.product_id}`)
            .then((res) => res.json())
            .then((productData) => {
              const product = productData[0];
              return {
                ...item,
                productName: product.name,
                price: product.price,
              };
            })
        );

        Promise.all(productDetailsPromises).then((enrichedItems) => {
          setCartItems(enrichedItems);
        });
      });
  }, [userId]);

  return (
    <div>
      {cartItems.map((item, index) => (
        <div key={index}>
          <h3>{item.productName}</h3>
          <p>${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
