import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY } from "./constants/CookieStrings";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const type = params.get('type');
  const access_token = params.get(ACCESS_TOKEN_KEY);

  if (type === 'recovery' && access_token) {
    return <Navigate to={`/reset-password?access_token=${access_token}`} replace />;
  }

  if (!access_token) {
    return <Navigate to="/sign-in" replace />;
  }




  return <>{children}</>;
}
