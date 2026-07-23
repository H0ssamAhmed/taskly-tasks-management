import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken, getRefreshToken } from "./cookies";
import { useUsers } from "@/features/auth/hooks/useUser";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const access_token = getAccessToken()
  const refresh_token = getRefreshToken()
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const type = params.get('type');
  const urlToken = params.get('access_token');
  const inviteToken = params.get('token');
  const { authError } = useUsers()
  const error = window.location.href.includes('access_denied');
  const IsInviteToken = window.location.href.includes("invite?token");




  if ((type === 'recovery' && urlToken)) {
    return <Navigate to={`/reset-password?access_token=${urlToken}`} replace />
  }
  if (error) {
    return <Navigate to={`/reset-password`} replace />
  }
  if ((!refresh_token && !access_token)) {
    const redirect = IsInviteToken ? "/sign-in?" : `/sign-in?token?=${inviteToken}`
    return <Navigate to={redirect} />;
  }

  if ((refresh_token && !access_token) && !IsInviteToken) {
    return <Navigate to="/" />;
  }
  if (authError) {
    return <Navigate to="/sign-in" />;
  }
  if (location.pathname == "/") {
    return <Navigate to="/project" />;
  }





  return <>{children}</>;
}
