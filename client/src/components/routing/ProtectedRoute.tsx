import { type ReactNode } from "react";
import { useAuth } from "../../hooks";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth/" replace />;
}
