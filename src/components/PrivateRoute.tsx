import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/auth/slice";

interface PrivateRouteProps {
  component: ReactNode;
  redirectTo: string;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component,
  redirectTo,
}) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? component : <Navigate to={redirectTo} />;
};
