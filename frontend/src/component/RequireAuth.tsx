import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/utils";

type Props = {};

const RequireAuth = (props: Props) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
