import { useState, type ReactNode } from "react";
import type { AuthContextValue, AuthNUser } from "../types";
import { AuthContext } from "./AuthContext";
import auth_user from "../assets/data/auth_user.json";
import { useNavigate } from "react-router-dom";
export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true),
    [authNUser, setAuthNUser] = useState<AuthNUser | null>(
      auth_user as AuthNUser,
    );

  const navigate = useNavigate();

  const logout = async () => {
    setAuthNUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const authContextValue: AuthContextValue = {
    isAuthenticated,
    authNUser,
    setAuthNUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
