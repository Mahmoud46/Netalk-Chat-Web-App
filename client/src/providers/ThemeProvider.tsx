import { useEffect, useState, type ReactNode } from "react";
import type { ThemeContextValue, ThemeMode } from "../types";
import { ThemeContext } from "./ThemeContext";

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  const [theme, setTheme] = useState<ThemeMode>(
      (localStorage.getItem("theme") as ThemeMode) ?? "light",
    ),
    [messageFontSize, setMessageFontSize] = useState<number>(
      (parseInt(localStorage.getItem("message-font-size") ?? "14") as number) ??
        14,
    );

  const toggleTheme = () => {
      const toggledTheme = theme == "light" ? "dark" : "light";

      setTheme(toggledTheme);
      document.documentElement.setAttribute("data-theme", toggledTheme);
      localStorage.setItem("theme", toggledTheme);
    },
    changeMessageFontSize = (fontSize: number) => {
      setMessageFontSize(fontSize);
      localStorage.setItem("message-font-size", `${fontSize}`);
    };

  const themeContextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    messageFontSize,
    changeMessageFontSize,
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
