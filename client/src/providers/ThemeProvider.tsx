import { useEffect, useState, type ReactNode } from "react";
import type { LanguageCode, ThemeContextValue, ThemeMode } from "../types";
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
    ),
    [isMessageTranslateButtonShown, setIsMessageTranslateButtonShown] =
      useState<boolean>(
        (JSON.parse(
          localStorage.getItem("show-translate-button") ?? "false",
        ) as boolean) ?? false,
      ),
    [langCode, setLangCode] = useState<LanguageCode>(
      (localStorage.getItem("lang-code") ?? "en") as LanguageCode,
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
    },
    toggleShowTranslateButton = () => {
      const isShowTranslateButton: boolean = !isMessageTranslateButtonShown;
      setIsMessageTranslateButtonShown(isShowTranslateButton);
      localStorage.setItem("show-translate-button", `${isShowTranslateButton}`);
    },
    changeLangCode = (langCode: LanguageCode) => {
      setLangCode(langCode);
      localStorage.setItem("lang-code", langCode);
    };

  const themeContextValue: ThemeContextValue = {
    theme,
    setTheme,
    toggleTheme,
    messageFontSize,
    changeMessageFontSize,
    toggleShowTranslateButton,
    isMessageTranslateButtonShown,
    langCode,
    changeLangCode,
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
