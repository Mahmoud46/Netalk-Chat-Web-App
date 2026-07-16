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
      path: `${BASE_ROUTE}/settings/privacy-Security`,
    },
    { label: "language", path: `${BASE_ROUTE}/settings/language` },
  ];
