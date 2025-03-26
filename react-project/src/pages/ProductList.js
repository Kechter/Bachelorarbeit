import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserId } from "./authUtils";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);

  const addToCart = (productId) => {
    const userId = getUserId();
    if (!userId) return;

    fetch("http://localhost:3001/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity: 1,
      }),
    });
  };

  if (loading) return <p>Loading product...</p>;

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <div>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => navigate("/cart")}>Go to Cart</button>
        <button onClick={() => navigate("/checkout")}>Go to Checkout</button>
      </div>
    </div>
  );
}
