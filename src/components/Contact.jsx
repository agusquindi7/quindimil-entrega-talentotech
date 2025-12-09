import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function Contact() {

  // 1. Creo la cajita (estado) para guardar el email
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  
  // 2. Cada vez que escribo en el input, se actualiza la cajita
  function handleChange(e) {
    setEmail(e.target.value);
  }

  // 3. Cuando aprieto Enviar, leo lo que hay en la cajita
  function handleSubmit(e) {
  e.preventDefault();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    toast.error("Email inválido ❌");
    return;
  }
  setEmail(""); // limpio el input
  setName("");
  setText("");
  toast.success("Formulario enviado correctamente");
}


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#FFE4C4" }} // fondo beige
    >
      
      <Helmet>
        <title>Contacto</title>
        <meta name="contact page" content="Conectamos clientes con freelancers de calidad en distintas áreas." />
      </Helmet>

      <div
        className="card shadow p-4"
        style={{ width: "400px", backgroundColor: "#f5deb3" }} // beige más oscuro
      >
        <h2 className="text-center mb-4" style={{ color: "#4a2c2a" }}>
          Contacto
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              placeholder="Tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
            className="form-control"
            type="email"
            placeholder="tu@email.com"
            value={email}          // el input muestra lo que hay en la cajita
            onChange={handleChange} // cada vez que escribís, se guarda en la cajita
            required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mensaje</label>
            <textarea
              className="form-control"
              rows="4"
              placeholder="Escribe tu mensaje..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{ backgroundColor: "#8B4513", color: "white" }} // marrón oscuro
            onClick={() => handleSubmit()}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}