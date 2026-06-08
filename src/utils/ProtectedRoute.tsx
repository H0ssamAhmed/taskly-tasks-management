import { Navigate } from "react-router-dom";
import { getAccessToken } from "./cookies";
import { useUsers } from "@/features/auth/hooks/useUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const access_token = getAccessToken()
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const type = params.get('type');
  const urlToken = params.get('access_token');
  const { authError } = useUsers()
  const error = location.href.includes('access_denied');

  if ((type === 'recovery' && urlToken)) {
    return <Navigate to={`/reset-password?access_token=${urlToken}`} replace />
  }
  if (error) {
    return <Navigate to={`/reset-password`} replace />
  }
  if (!access_token) {
    return <Navigate to="/sign-in" />;
  }
  if (authError) {
    return <Navigate to="/sign-in" />;
  }




  return <>{children}</>;
}
