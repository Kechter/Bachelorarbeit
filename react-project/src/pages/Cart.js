import { useNavigate } from "react-router-dom";
import CartComponent from "./CartComponent";
import { getUserId } from "./authUtils";

export default function Cart() {
  const navigate = useNavigate();
  const userId = getUserId();

  return (
    <div>
      <h2>Cart</h2>
      <CartComponent userId={userId} />
      <button onClick={() => navigate("/products")}>Go to Products</button>
      <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
    </div>
  );
}
