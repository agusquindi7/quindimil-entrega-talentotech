import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  function validateForm() {
    const newErrors = {};
    if (!usuario) newErrors.usuario = toast.error("El usuario es obligatorio");
    if (!password) newErrors.password = toast.error("La contraseña es obligatoria");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validateForm()) {
      onLogin(); // tu lógica de login
      toast.success("Inicio de sesion exitoso");
      // si venía con redirectTo, lo mando ahí; sino a /freelancers
      const redirectPath = location.state?.redirectTo || "/freelancers";
      navigate(redirectPath, { replace: true });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
<Helmet>
        <title>Login required</title>
        <meta name="login page" content="Conectamos clientes con freelancers de calidad en distintas áreas." />
      </Helmet>


      <div className="mb-3">
        <label className="form-label">Usuario</label>
        <input
          type="text"
          className={`form-control ${errors.usuario ? "is-invalid" : usuario ? "is-valid" : ""}`}
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        
      </div>

      <div className="mb-3">
        <label className="form-label">Contraseña</label>
        <input
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : password ? "is-valid" : ""}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
      </div>

      <button type="submit" className="btn btn-primary">Ingresar</button>
    </form>
  );
}
