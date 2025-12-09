import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // si no está loggeado, lo mando al login con redirectTo
    return <Navigate to="/login" state={{ redirectTo: location.pathname }} replace />;
  }

  return <Outlet />;
}
