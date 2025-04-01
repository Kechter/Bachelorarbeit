...
useEffect(() => {
    fetch(`http://localhost:3001/api/cart?userId=${userId}`)
      .then(res => res.json())
      .then(cartItems => {
        const productPromises = cartItems.map(async item => {
          const res = await fetch(`http://localhost:3001/api/product/${item.product_id}`);
          const productData = await res.json();
          return { ...item, productName: productData[0].name, price: productData[0].price };
        });
        return Promise.all(productPromises);
      })
      .then(enrichedCart => {
        const total = enrichedCart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
      });
}, [userId]);
...
<h2>Checkout</h2>
<CartComponent userId={userId} />
<h3>Total: ${totalPrice.toFixed(2)}</h3>
...
<button onClick={() => navigate("/cart")}>Go to Cart</button>
<button onClick={() => navigate("/products")}>Go to Products</button>
...