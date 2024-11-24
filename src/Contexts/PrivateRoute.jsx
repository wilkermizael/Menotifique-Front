/* eslint-disable react/prop-types */

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Exemplo com localStorage

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
