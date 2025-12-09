import { useContext } from "react";
import { Link } from "react-router-dom";
import './Cart.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { CartContext } from "../App.jsx"; // importa tu contexto

export default function Cart() {
  // 🔹 Consumir el contexto
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const cantidad = cart.length;

  function handleRemove(id, name) {
    removeFromCart(id);
    toast.info(`Freelancer ${name} eliminado del carrito ❌`);
  }

  function handleClear() {
    clearCart();
    toast.success("Carrito vaciado correctamente 🗑️");
  }

  return (
    <div className="cart container mt-4">

      <Helmet>
        <title>Carrito</title>
        <meta
          name="shopping cart page"
          content="Conectamos clientes con freelancers de calidad en distintas áreas."
        />
      </Helmet>

      <h2 className="mb-3">Carrito</h2>

      {cantidad === 0 ? (
        <p>No hay freelancers contratados.</p>
      ) : (
        <>
          {/* Número de freelancers contratados */}
          <div className="alert alert-info d-flex justify-content-between align-items-center">
            <span>
              <strong>Freelancers contratados:</strong> {cantidad}
            </span>
            <span className="badge bg-primary fs-6">{cantidad}</span>
          </div>

          <ul className="list-group mb-3">
            {cart.map((item) => (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <h5 className="mb-1">{item.name}</h5>
                  <small className="text-muted">{item.department}</small>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "8px"
                  }}
                />
                <button
                  className="btn btn-sm btn-outline-danger ms-2"
                  onClick={() => handleRemove(item.id, item.name)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <button className="btn btn-danger" onClick={handleClear}>
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
