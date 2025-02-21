import {  useEffect, useState } from "react";

export default function ProductList() {
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

    if(loading) return <p>Loading product...</p>

    return (
        <div>
            <h2>Products</h2>
            {products.map((product) => (
                <div key={product.id}>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                </div>
            ))}
        </div>
    );
}