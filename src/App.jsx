import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from './components/Header.jsx'
import Navbar from './components/Navbar.jsx'
import Body from './components/Body.jsx'
import Cart from './components/Cart.jsx'
import './root.css'


export default function App() {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // ➕ Agregar al carrito sin duplicar
  const addToCart = (product) => {
    const exists = cart.some((item) => item.id === product.id);
    if (!exists) {
      const updated = [...cart, product];
      setCart(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
    } else {
      alert(`${product.name} ya fue agregado.`);
    }
  };

  // ❌ Eliminar del carrito
  const removeFromCart = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Header cartCount={cart.length} />
      <Navbar></Navbar>
      <Routes>
        {/* 👇 Le pasás la función y el carrito */}
        <Route path="/" element={<Body addToCart={addToCart} cart={cart} />} />

        {/* 👇 Le pasás el carrito y funciones para modificarlo */}
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              clearCart={clearCart}
            />
          }
        />
      </Routes>
    </>
  );
}
