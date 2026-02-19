import React from "react";
import UseAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = UseAuth();
  const location = useLocation();
  console.log(location);

  if (loading) {
    return <span className="loading loading-infinity loading-xl"></span>;
  }
  if (!user) {
    return <Navigate 
     to="/login"
     state={{ from: location.pathname }}
     replace
     ></Navigate>;
  }
  return children;
};

export default PrivateRoute;
