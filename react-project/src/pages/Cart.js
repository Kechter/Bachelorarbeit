import { useNavigate } from "react-router-dom";
import CartComponent from "./CartComponent";

export default function Cart() {
  const navigate = useNavigate();
  const userId = "df992ef6-af8d-4d4d-8f50-1214b7520dcf";

  return (
    <div>
      <CartComponent userId={userId} />
      <button onClick={() => navigate("/products")}>Go to Products</button>
      <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
    </div>
  );
}
