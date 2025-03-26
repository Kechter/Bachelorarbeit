import { useNavigate } from "react-router-dom";
import CartComponent from "./CartComponent";
import { useEffect, useState } from "react";
import { getUserId } from "./authUtils";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = getUserId();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:3001/api/cart?userId=${userId}`)
      .then((res) => res.json())
      .then(async (cartItems) => {
        const productPromises = cartItems.map(async (item) => {
          const res = await fetch(
            `http://localhost:3001/api/product/${item.product_id}`
          );
          const productData = await res.json();
          return {
            ...item,
            productName: productData[0].name,
            price: productData[0].price,
          };
        });

        const enrichedCart = await Promise.all(productPromises);
        const total = enrichedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
        setTotalPrice(total);
      });
  }, [userId]);

  return (
    <div>
      <h2>Checkout</h2>
      <CartComponent userId={userId} />
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
      <h3>Payment Information</h3>
      <form>
        <label>Card Number</label>
        <input type="text" placeholder="1234 5678 9012 3456" readOnly />
        <br />
        <label>Expiry Date</label>
        <input type="text" placeholder="MM/YY" readOnly />
        <br />
        <label>CVV</label>
        <input type="text" placeholder="123" readOnly />
        <br />
        <button type="submit">Proceed to Payment</button>
      </form>
      <button onClick={() => navigate("/cart")}>Go to Cart</button>
      <button onClick={() => navigate("/products")}>Go to Products</button>
    </div>
  );
}
