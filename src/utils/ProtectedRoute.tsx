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

  // Parse query params (for invite tokens)
  const searchParams = new URLSearchParams(window.location.search);
  const inviteToken = searchParams.get('token');
  const isInvitePage = location.pathname === '/invite';

  const { authError } = useUsers();
  const error = window.location.href.includes('access_denied');




  if ((type === 'recovery' && urlToken)) {
    return <Navigate to={`/reset-password?access_token=${urlToken}`} replace />
  }

  if (error) {
    return <Navigate to={`/reset-password`} replace />
  }
  // NOT AUTHENTICATED
  if (!refresh_token && !access_token) {
    // Allow invite page access, but redirect to sign-in with redirect URL
    if (isInvitePage && inviteToken) {
      const redirectUrl = `/invite?token=${inviteToken}`;
      return <Navigate to={`/sign-in?redirect=${encodeURIComponent(redirectUrl)}`} replace />;
    }
    // Other pages require authentication
    return <Navigate to="/sign-in" replace />;
  }
  // Only refresh token, no access token
  if (refresh_token && !access_token) {
    return <Navigate to="/" replace />;
  }
  // Auth error
  if (authError) {
    return <Navigate to="/sign-in" replace />;
  }

  // Redirect root to project
  if (location.pathname === "/") {
    return <Navigate to="/project" replace />;
  }






  return <>{children}</>;
}
