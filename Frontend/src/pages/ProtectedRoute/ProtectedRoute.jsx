import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext.jsx";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(ShopContext);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
