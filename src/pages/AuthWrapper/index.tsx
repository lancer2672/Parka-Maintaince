import { useAppSelector } from "@/store/hooks";
import { authState$ } from "@/store/selectors";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper: React.FC = ({ children }) => {
  let authState = useAppSelector(authState$);

  if (!authState.auth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
