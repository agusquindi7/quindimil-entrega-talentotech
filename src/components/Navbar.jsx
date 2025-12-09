import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar({ cartCount, isAuthenticated, onLogout }) {
  const nav = useNavigate();

  function handleLogout() {
    onLogout();
    nav("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Home</Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/freelancers">Freelancers</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contacto</Link>
            </li>
            
          </ul>

          {/* Login / Logout dinámico */}
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
