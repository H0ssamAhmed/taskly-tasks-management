import { Navigate } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "./cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function RedirectIfLoggedIn({ children }: ProtectedRouteProps) {
  const access_token = getAccessToken()
  const refresh_token = getRefreshToken()
  if (access_token || refresh_token) {
    return <Navigate to="/" />;
  }



  return <>{children}</>;
}
