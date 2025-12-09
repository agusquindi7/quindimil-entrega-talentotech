import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { useContext } from "react";
import { CartContext } from "../App.jsx";

import FreelancerForm from "./FreelancerForm.jsx";

const Body = ({ addToCart, cart, searchTerm }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState(""); // estado para alertas

  // 🔹 Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 24; // cantidad de freelancers por página

  const { setCart } = useContext(CartContext);
  
  useEffect(() => {
    fetch("https://68f13b570b966ad50035c60f.mockapi.io/PeopleServices")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="body-v1"><h3>Cargando productos...</h3></div>;

  // función wrapper para addToCart
  function handleAddToCart(product) {
    addToCart(product);
  }

  // 🔹 Filtrar productos según el searchTerm
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 🔹 Calcular índices para paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // 🔹 Total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  function handleDelete(id) {
  fetch(`https://68f13b570b966ad50035c60f.mockapi.io/PeopleServices/${id}`, {
    method: "DELETE",
  })
    .then(() => {
      // Actualizamos el estado sacando el freelancer borrado
      setProducts(products.filter((p) => p.id !== id));
    })
    .catch((err) => console.log(err));
}

  function handleUpdate(updatedFreelancer) {
  // Actualiza la lista de freelancers
  setProducts(prevProducts =>
    prevProducts.map(p =>
      p.id === updatedFreelancer.id ? updatedFreelancer : p
    )
  );

  // Actualiza también el carrito
  setCart(prevCart =>
    prevCart.map(c =>
      c.id === updatedFreelancer.id ? updatedFreelancer : c
    )
  );
}

  return (
    <div className="container mt-4">

      <FreelancerForm onAdd={(newFreelancer) => setProducts([...products, newFreelancer])} />

      <h2 className="mb-4">Available Freelancers</h2>

      {/* Alert fijo al costado */}
      {feedback && (
        <div
          className="alert alert-success fade show"
          role="alert"
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            zIndex: 9999,
            minWidth: "250px"
          }}
        >
          {feedback}
        </div>
      )}

      <div className="row">
        {currentItems.map((product) => {
          const alreadyInCart = cart.some((item) => item.id === product.id);
          return (
            <div key={product.id} className="col-12 col-md-6 col-lg-4 mb-4">
              <ProductCard
  product={product}
  alreadyInCart={alreadyInCart}
  onDelete={handleDelete}
  onUpdate={handleUpdate}
/>
            </div>
          );
        })}
      </div>

      {/* 🔹 Botones de paginación */}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ◀ Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Siguiente ▶
        </button>
      </div>
    </div>
  );
};

export default Body;
