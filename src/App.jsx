import { Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext} from "react";

import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import Cart from './components/Cart.jsx';
import Contact from "./components/Contact.jsx";
import './root.css';
import Notfound from "./components/Notfound.jsx";
import { LoremIpsum } from "./components/LoremIpsum.jsx";
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute.jsx';
import Home from "./components/Home";
import Freelancers from "./components/Freelancers";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cart, setCart] = useState([]);

  // 🔹 cargar datos al inicio
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const savedAuth = localStorage.getItem("auth") === "true";
    setIsAuthenticated(savedAuth);
  }, []);

  // 🔹 guardar carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // 🔹 guardar login cada vez que cambia
  useEffect(() => {
    localStorage.setItem("auth", isAuthenticated);
  }, [isAuthenticated]);

  // funciones carrito
  const addToCart = (item) => setCart([...cart, item]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.length;

  return (
    <>
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart, cartCount }}>
      <Header 
        cartCount={cartCount} 
        isAuthenticated={isAuthenticated} 
        onLogout={() => setIsAuthenticated(false)} 
      />
      <Navbar 
  cartCount={cartCount} 
  isAuthenticated={isAuthenticated} 
  onLogout={() => setIsAuthenticated(false)} 
/>

    {/* 🔹 Toastify container */}
      <ToastContainer position="bottom-left" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/carrito"
            element={<Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />}
          />
        </Route>

        <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/freelancers"
            element={<Freelancers addToCart={addToCart} cart={cart} />}
          />
        </Route>

        <Route path="/contact" element={<Contact />} />
        <Route path="/lorem" element={<LoremIpsum />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
      </CartContext.Provider>
    </>
  );
}

export default App;
