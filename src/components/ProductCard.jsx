import React from "react";
import './ProductCard.css';

export default function ProductCard({ product, addToCart, alreadyInCart }) {
  return (
    <div className="product-card">
      <h4>{product.name}</h4>
      <p>Department of {product.department}</p>
      <img src={product.image} alt={product.name} />
      <p>📱{product.phone}</p>
      <button onClick={() => addToCart(product)} disabled={alreadyInCart}>
        {alreadyInCart ? "Contratado ✅" : "Contratar"}
      </button>
    </div>
  );
}