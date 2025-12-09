import React, { useState, useContext } from "react";
import './ProductCard.css';
import "bootstrap/dist/css/bootstrap.min.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CartContext } from "../App.jsx"; 
import EditFreelancerForm from "./EditFreelancerForm"; // importa tu form

export default function ProductCard({ product, alreadyInCart, onDelete, onUpdate }) {
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false); // 🔹 controla si se muestra el form de edición

  const { addToCart } = useContext(CartContext);

  function handleClick() {
    setLoading(true);
    addToCart(product);
    setTimeout(() => setLoading(false), 1000); 
    toast.success(`¡${product.name} contratado con éxito!`);
  }

  return (
    <div className="card h-100 d-flex flex-column shadow-sm">
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top img-fluid"
        style={{ objectFit: "cover", maxHeight: "200px" }}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted">{product.department}</p>

        {/* Botón contratar */}
        <button
          onClick={handleClick}
          disabled={alreadyInCart || loading}
          className={`btn ${alreadyInCart ? "btn-success" : "btn-primary"} mt-auto`}
        >
          {alreadyInCart
            ? "Contratado ✅"
            : loading
              ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Contratando...
                </>
              )
              : "Contratar"}
        </button>

        {/* Botón eliminar */}
        <button
          onClick={() => {
            if (window.confirm("¿Estás seguro de eliminar este freelancer?")) {
              onDelete(product.id);
              toast.info(`Freelancer ${product.name} eliminado`);
            }
          }}
          className="btn btn-danger mt-2"
        >
          Eliminar
        </button>

        {/* Botón editar */}
        <button
          className="btn btn-warning mt-2"
          onClick={() => setShowEdit(true)}
        >
          Editar
        </button>

        {/* Render condicional del formulario de edición */}
        {showEdit && (
          <div className="mt-3">
            <EditFreelancerForm
              freelancer={product}
              onUpdate={onUpdate}
              onClose={() => setShowEdit(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
