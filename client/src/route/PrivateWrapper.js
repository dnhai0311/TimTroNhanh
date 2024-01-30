import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const PrivateWrapper = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateWrapper;
