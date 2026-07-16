import type { ReactNode } from "react";
import inbox_icon from "../../../assets/icons/inbox.png";
import inbox_active_icon from "../../../assets/icons/inbox_active.png";

import contacts_icon from "../../../assets/icons/contacts.png";
import contacts_active_icon from "../../../assets/icons/contacts_active.png";

import archive_icon from "../../../assets/icons/archive.png";
import archive_active_icon from "../../../assets/icons/archive_active.png";

import settings_icon from "../../../assets/icons/settings.png";
import settings_active_icon from "../../../assets/icons/settings_active.png";

import profile_icon from "../../../assets/icons/profile.png";
import profile_active_icon from "../../../assets/icons/profile_active.png";
import logout_icon from "../../../assets/icons/logout.png";

import appearance_icon from "../../../assets/icons/appearance.png";
import appearance_active_icon from "../../../assets/icons/appearance_active.png";

import language_icon from "../../../assets/icons/language.png";
import language_active_icon from "../../../assets/icons/langauge_active.png";

import security_privacy_icon from "../../../assets/icons/privacy_security.png";
import security_privacy_active_icon from "../../../assets/icons/security_privacy_active.png";

export const SidebarIcon = ({
  label,
  isActive = false,
  className = "",
}: {
  label?: string;
  isActive?: boolean;
  className?: string;
}): ReactNode => {
  switch (label) {
    case "inbox":
      return isActive ? (
        <img
          src={inbox_active_icon}
          loading="lazy"
          className={className ?? ""}
        />
      ) : (
        <img src={inbox_icon} loading="lazy" className={className ?? ""} />
      );
    case "contacts":
      return isActive ? (
        <img
          src={contacts_active_icon}
          loading="lazy"
          className={className ?? ""}
        />
      ) : (
        <img src={contacts_icon} loading="lazy" className={className ?? ""} />
      );
    case "archive":
      return isActive ? (
        <img
          src={archive_active_icon}
          loading="lazy"
          className={className ?? ""}
        />
      ) : (
        <img src={archive_icon} loading="lazy" className={className ?? ""} />
      );
    case "settings":
      return isActive ? (
        <img
          src={settings_active_icon}
          loading="lazy"
          className={className ?? ""}
        />
      ) : (
        <img src={settings_icon} loading="lazy" className={className ?? ""} />
      );
    default:
      return (
        <img src={logout_icon} loading="lazy" className={className ?? ""} />
      );
  }
};

export const SettingsSidebarIcon = ({
  label,
  isActive = false,
  className = "",
}: {
  label?: string;
  isActive?: boolean;
  className?: string;
}) => {
  switch (label) {
    case "account":
      return isActive ? (
        <img src={profile_active_icon} loading="lazy" className={className} />
      ) : (
        <img src={profile_icon} loading="lazy" className={className ?? ""} />
      );
    case "appearance":
      return isActive ? (
        <img
          src={appearance_active_icon}
          loading="lazy"
          className={className}
        />
      ) : (
        <img src={appearance_icon} loading="lazy" className={className} />
      );
    case "language":
      return isActive ? (
        <img src={language_active_icon} loading="lazy" className={className} />
      ) : (
        <img src={language_icon} loading="lazy" className={className} />
      );

    default:
      return isActive ? (
        <img
          src={security_privacy_active_icon}
          loading="lazy"
          className={className}
        />
      ) : (
        <img src={security_privacy_icon} loading="lazy" className={className} />
      );
  }
};
