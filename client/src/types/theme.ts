export type ThemeMode = "light" | "dark" | "system";

export type IconWeight = "thin" | "normal" | "bold";

export interface ThemeContextValue {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  messageFontSize: number;
  changeMessageFontSize: (fontSize: number) => void;
}

export type LanguageCode =
  | "ar"
  | "bn"
  | "zh"
  | "nl"
  | "en"
  | "fr"
  | "de"
  | "el"
  | "he"
  | "hi"
  | "id"
  | "it"
  | "ja"
  | "ko"
  | "ms"
  | "fa"
  | "pl"
  | "pt"
  | "pa"
  | "ro"
  | "ru"
  | "es"
  | "sw"
  | "ta"
  | "te"
  | "th"
  | "tr"
  | "uk"
  | "ur"
  | "vi";
