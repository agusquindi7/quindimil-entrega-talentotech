import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./CornsilkDiv.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useContext } from "react";
import { CartContext } from "../App.jsx";

export default function Header({ cartCount, isAuthenticated, onLogout }) {
  const nav = useNavigate();
  const cart = useContext(CartContext);
  
  function handleLogout() {
    onLogout();
    toast.info("Has cerrado sesión correctamente");
    nav("/");
  }

  return (
    <header className="header-custom p-3">
      <div className="container d-flex justify-content-between align-items-center">
        <h1 className="h4 m-0 text-black">Freelance Central</h1>

        <div className="d-flex align-items-center gap-4">
          {/* Carrito */}
          <Link to="/carrito" className="position-relative d-inline-block">
            <img
              className="shopping-cart"
              src="public/shopping-cart.png"
              alt="shopping-cart"
              style={{ width: "32px", height: "auto", cursor: "pointer" }}
            />
            {isAuthenticated && cartCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.cartCount}
              </span>
            )}
          </Link>

          {/* Logout */}
          {isAuthenticated && (
            <button
              className="btn btn-sm"
              style={{ backgroundColor: "#8B4513", color: "white" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
