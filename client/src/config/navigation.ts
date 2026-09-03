export const BASE_ROUTE: string = "/app";

export const SIDEBAR_ITEMS: { label: string; path: string }[] = [
    { label: "inbox", path: `${BASE_ROUTE}/inbox` },
    { label: "contacts", path: `${BASE_ROUTE}/contacts` },
    { label: "archive", path: `${BASE_ROUTE}/archive` },
    { label: "settings", path: `${BASE_ROUTE}/settings` },
    { label: "profile", path: `${BASE_ROUTE}/profile` },
  ],
  SETTINGS_SIDEBAR_ITEMS: { label: string; path: string }[] = [
    { label: "account", path: `${BASE_ROUTE}/settings/account` },
    { label: "appearance", path: `${BASE_ROUTE}/settings/appearance` },
    {
      label: "privacy & Security",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    { label: "language", path: `${BASE_ROUTE}/settings/language` },
  ],
  SETTINGS_NAVIGATION_MAP = [
    // Account
    {
      keywords: ["account", "profile"],
      label: "Account",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["full name", "name", "display name"],
      label: "Full Name",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["first name"],
      label: "First Name",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["last name", "surname", "family name"],
      label: "Last Name",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["title", "job title"],
      label: "Title",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["bio", "about", "about me", "description"],
      label: "Bio",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["birthday", "birthdate", "date of birth"],
      label: "Birthday",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["address"],
      label: "Address",
      path: `${BASE_ROUTE}/settings/account`,
    },
    {
      keywords: ["contact info", "contact information", "contacts"],
      label: "Contact Information",
      path: `${BASE_ROUTE}/settings/account`,
    },

    // Appearance
    {
      keywords: ["appearance", "theme", "dark theme", "light theme"],
      label: "Appearance",
      path: `${BASE_ROUTE}/settings/appearance`,
    },
    {
      keywords: ["dark mode", "dark theme"],
      label: "Dark Mode",
      path: `${BASE_ROUTE}/settings/appearance`,
    },
    {
      keywords: ["light mode", "light theme"],
      label: "Light Mode",
      path: `${BASE_ROUTE}/settings/appearance`,
    },
    {
      keywords: ["font size", "text size"],
      label: "Font Size",
      path: `${BASE_ROUTE}/settings/appearance`,
    },
    {
      keywords: ["message font size", "message text size"],
      label: "Message Font Size",
      path: `${BASE_ROUTE}/settings/appearance`,
    },

    // Privacy & Security
    {
      keywords: [
        "privacy",
        "security",
        "privacy & security",
        "privacy and security",
      ],
      label: "Privacy & Security",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    {
      keywords: ["email", "email address"],
      label: "Email",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    {
      keywords: ["phone", "phone number", "mobile number"],
      label: "Phone Number",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    {
      keywords: ["password", "change password", "new password"],
      label: "Password",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    {
      keywords: [
        "two-factor authentication",
        "two factor authentication",
        "2fa",
        "2FA",
      ],
      label: "Two-Factor Authentication",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },
    {
      keywords: ["blocked users", "blocked accounts", "block users"],
      label: "Blocked Users",
      path: `${BASE_ROUTE}/settings/privacy-security`,
    },

    // Language
    {
      keywords: ["language", "language settings", "app language"],
      label: "Language",
      path: `${BASE_ROUTE}/settings/language`,
    },
    {
      keywords: [
        "translate",
        "translation",
        "translate messages",
        "message translation",
      ],
      label: "Translate Messages",
      path: `${BASE_ROUTE}/settings/language`,
    },
    {
      keywords: ["show translate button", "translate button"],
      label: "Show Translate Button",
      path: `${BASE_ROUTE}/settings/language`,
    },
  ];
