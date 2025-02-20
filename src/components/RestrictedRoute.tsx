import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/slice";

interface RestrictedRouteProps {
  component: ReactNode;
  redirectTo: string;
}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component,
  redirectTo,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : component;
};
