import { useContext } from "react";
import type { ThemeContextValue } from "../types";
import { ThemeContext } from "../providers/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext) as ThemeContextValue;
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
