import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <div style={{ backgroundColor: "#FFE4C4", minHeight: "100vh" }}>
      {/* Helmet para SEO */}
      <Helmet>
        <title>Home</title>
        <meta name="home page" content="Conectamos clientes con freelancers de calidad en distintas áreas." />
      </Helmet>

      <div className="container py-5">
        {/* Título */}
        <h1 className="text-center mb-4" style={{ color: "#4a2c2a" }}>
          Bienvenido a Freelance Central
        </h1>

        {/* Intro */}
        <p className="text-center mb-5">
          Conectamos clientes con freelancers de calidad en distintas áreas.
          Encuentra el talento que necesitas de forma rápida y segura.
        </p>

        {/* Tarjetas iguales */}
        <div className="row text-center">
          <div className="col-md-4 mb-4 d-flex">
            <div
              className="card shadow flex-fill"
              style={{ backgroundColor: "#f5deb3" }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Variedad de talentos</h5>
                <p className="card-text flex-grow-1">
                  Programadores, diseñadores, redactores y más en un solo lugar.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4 d-flex">
            <div
              className="card shadow flex-fill"
              style={{ backgroundColor: "#f5deb3" }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Proceso simple</h5>
                <p className="card-text flex-grow-1">
                  Regístrate, busca freelancers y contrata en minutos.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4 d-flex">
            <div
              className="card shadow flex-fill"
              style={{ backgroundColor: "#f5deb3" }}
            >
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Seguridad</h5>
                <p className="card-text flex-grow-1">
                  Tu sesión y tus contrataciones están protegidas.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-4">
          <Link
            to="/freelancers"
            className="btn"
            style={{ backgroundColor: "#8B4513", color: "white" }}
          >
            Ver freelancers
          </Link>
        </div>
      </div>
    </div>
  );
}