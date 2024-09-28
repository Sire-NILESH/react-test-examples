import React from "react";
import { User } from "../types/types";
import { useAppSelector } from "../hooks/useAppSelector";
import { authIsLoadingSelector, authUserSelector } from "../store/authSlice";

type ProtectedRouteProps = {
  children?: React.ReactElement;
  allowedRoles?: User["role"][];
};

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = useAppSelector(authUserSelector);
  const userIsLoading = useAppSelector(authIsLoadingSelector);

  if (userIsLoading) {
    return <div>Loading...</div>;
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <div>Permission denied, unauthorised</div>;
  }

  return children ?? null;
};

export default ProtectedRoute;
