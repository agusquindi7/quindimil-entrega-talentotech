import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './Cart.css';

export default function Cart({ cart, removeFromCart, clearCart }) {
  return (
    <div className="cart">
      <h2>Carrito</h2>
      {cart.length === 0 ? (
        <p>No hay freelancers contratados.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <h5>{item.name}</h5> 
                <h5>{item.department}</h5>
                <img src={item.image} alt={item.name} />
                <button className="remove" onClick={() => removeFromCart(item.id)}>❌</button>
              </li>
            ))}
          </ul>
          <button className="clear" onClick={clearCart}>Vaciar carrito</button>
        </>
      )}
      
    </div>
  );
}