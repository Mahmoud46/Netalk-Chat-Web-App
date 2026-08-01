import { useState, type ReactNode } from "react";
import type { AuthContextValue, AuthNUser } from "../types";
import { AuthContext } from "./AuthContext";
import auth_user from "../assets/data/auth_user.json";
export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  const [isAuthenticated] = useState<boolean>(false),
    [authNUser, setAuthNUser] = useState<AuthNUser | null>(
      auth_user as AuthNUser,
    );

  const authContextValue: AuthContextValue = {
    isAuthenticated,
    authNUser,
    setAuthNUser,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
