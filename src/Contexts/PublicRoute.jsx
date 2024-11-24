/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken");

  return isAuthenticated ? <Navigate to="/painel" /> : children;
};

export default PublicRoute;
