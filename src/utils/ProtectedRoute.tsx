import { Navigate } from "react-router-dom";
import { getAccessToken } from "./cookies";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const access_token = getAccessToken()
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const type = params.get('type');
  const urlToken = params.get('access_token');
  console.log(type);
  console.log(access_token);
  console.log(urlToken);

  if (type === 'recovery' && urlToken) {
    return <Navigate to={`/reset-password?access_token=${urlToken}`} replace />
  }
  if (!access_token) {
    return <Navigate to="/sign-in" replace />;
  }




  return <>{children}</>;
}
