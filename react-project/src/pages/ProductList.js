import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    const userId = "df992ef6-af8d-4d4d-8f50-1214b7520dcf";
    const quantity = 1;

    fetch("http://localhost:3001/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
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
