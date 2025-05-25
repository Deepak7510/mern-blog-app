import {
  routeAdminManageDashBoard,
  RouteSignIn,
  RouteUserIndexBlogs,
  RouteUserManageBlogs,
  //   RouteUsers,
} from "@/helpers/route";
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ToProtecteRoute = ({ user, isAuthenticated, children }) => {
  const location = useLocation();
  if (isAuthenticated && location.pathname.includes("/auth")) {
    if (user.role === "user") {
      return <Navigate to={RouteUserIndexBlogs} />;
    } else if (user.role === "admin") {
      return <Navigate to={routeAdminManageDashBoard} />;
    }
  }

  if (
    !isAuthenticated &&
    (location.pathname.includes("/admin") ||
      location.pathname == RouteUserManageBlogs)
  ) {
    return <Navigate to={RouteSignIn} />;
  }

  if (
    isAuthenticated &&
    user.role === "user" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to={RouteUserIndexBlogs} />;
  }

  return <>{children}</>;
};

export default ToProtecteRoute;
