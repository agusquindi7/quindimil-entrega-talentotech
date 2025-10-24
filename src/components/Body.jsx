import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./body.css";

const Body = ({ addToCart, cart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="body-v1">
      <h2>Available Freelancers</h2>
      <div className="products-container">
        {products.map((product) => {
          const alreadyInCart = cart.some((item) => item.id === product.id);
          return (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              alreadyInCart={alreadyInCart}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Body;
