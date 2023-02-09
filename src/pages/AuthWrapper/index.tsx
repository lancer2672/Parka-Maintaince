import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper: React.FC = ({ children }) => {
  let idCompany = localStorage.getItem("COMPANY_ID");

  if (!idCompany) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
