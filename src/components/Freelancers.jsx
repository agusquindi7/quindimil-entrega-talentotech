import React, { useState } from "react";
import Body from "./Body";
import { Helmet } from "react-helmet";

export default function Freelancers({ addToCart, cart }) {
  // 1️⃣ Estado para guardar lo que escribe el usuario
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div style={{ padding: "20px" }}>
      <Helmet>
        <title>Freelancers</title>
        <meta
          name="freelancers page"
          content="Conectamos clientes con freelancers de calidad en distintas áreas."
        />
      </Helmet>

      <h2>Catálogo de Freelancers</h2>

      {/* 2️⃣ Barra de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por nombre o área..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      {/* 3️⃣ Pasamos el searchTerm a Body para que filtre */}
      <Body addToCart={addToCart} cart={cart} searchTerm={searchTerm} />
    </div>
  );
}
