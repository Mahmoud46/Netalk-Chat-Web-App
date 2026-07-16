import { useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import type { AuthContextValue } from "../types";

export const useAuth = () => {
  const context = useContext(AuthContext) as AuthContextValue;
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
