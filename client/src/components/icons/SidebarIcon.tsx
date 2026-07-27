// Main sidebar
import archive_icon from "../../assets/icons/sidebar/archive.png";
import inbox_icon from "../../assets/icons/sidebar/inbox.png";
import cog_icon from "../../assets/icons/sidebar/cog.png";
import group_icon from "../../assets/icons/sidebar/group.png";
import arrow_out_right_circle_half from "../../assets/icons/sidebar/arrow_out_right_circle_half.png";

import archive_solid_icon from "../../assets/icons/sidebar/archive_solid.png";
import inbox_solid_icon from "../../assets/icons/sidebar/inbox_solid.png";
import cog_solid_icon from "../../assets/icons/sidebar/cog_solid.png";
import group_solid_icon from "../../assets/icons/sidebar/group_solid.png";

import inbox_thin_icon from "../../assets/icons/sidebar/inbox_thin.png";
import group_thin_icon from "../../assets/icons/sidebar/group_thin.png";
import archive_thin_icon from "../../assets/icons/sidebar/archive_thin.png";
import cog_thin_icon from "../../assets/icons/sidebar/cog_thin.png";
import arrow_out_right_circle_half_thin from "../../assets/icons/sidebar/arrow_out_right_circle_half_thin.png";

import inbox_solid_thin_icon from "../../assets/icons/sidebar/inbox_solid_thin.png";
import group_solid_thin_icon from "../../assets/icons/sidebar/group_solid_thin.png";
import archive_solid_thin_icon from "../../assets/icons/sidebar/archive_solid_thin.png";
import cog_solid_thin_icon from "../../assets/icons/sidebar/cog_solid_thin.png";

// Settings sidebar
import user_hexagon_icon from "../../assets/icons/sidebar/user_hexagon.png";
import palette_icon from "../../assets/icons/sidebar/palette.png";
import globe_alt_2_icon from "../../assets/icons/sidebar/globe_alt_2.png";
import shield_quarter_icon from "../../assets/icons/sidebar/shield_quarter.png";

import user_hexagon_solid_icon from "../../assets/icons/sidebar/user_hexagon_solid.png";
import palette_solid_icon from "../../assets/icons/sidebar/palette_solid.png";
import globe_alt_2_solid_icon from "../../assets/icons/sidebar/globe_alt_2_solid.png";
import shield_quarter_solid_icon from "../../assets/icons/sidebar/shield_quarter_solid.png";

import user_hexagon_thin_icon from "../../assets/icons/sidebar/user_hexagon_thin.png";
import palette_thin_icon from "../../assets/icons/sidebar/palette_thin.png";
import globe_alt_2_thin_icon from "../../assets/icons/sidebar/globe_alt_2_thin.png";
import shield_quarter_thin_icon from "../../assets/icons/sidebar/shield_quarter_thin.png";

import user_hexagon_solid_thin_icon from "../../assets/icons/sidebar/user_hexagon_solid_thin.png";
import palette_solid_thin_icon from "../../assets/icons/sidebar/palette_solid_thin.png";
import globe_alt_2_solid_thin_icon from "../../assets/icons/sidebar/globe_alt_2_solid_thin.png";
import shield_quarter_solid_thin_icon from "../../assets/icons/sidebar/shield_quarter_solid_thin.png";

import type { IconWeight } from "../../types";
import type { ReactNode } from "react";

export const MainSidebarIcon = ({
  label,
  isActive = false,
  className = "",
  weight = "base",
}: {
  label?: string;
  isActive?: boolean;
  className?: string;
  weight?: IconWeight;
}): ReactNode => {
  switch (label) {
    case "inbox":
      return isActive ? (
        <img
          src={weight == "thin" ? inbox_solid_thin_icon : inbox_solid_icon}
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? inbox_thin_icon : inbox_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "contacts":
      return isActive ? (
        <img
          src={weight == "thin" ? group_solid_thin_icon : group_solid_icon}
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? group_thin_icon : group_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "archive":
      return isActive ? (
        <img
          src={weight == "thin" ? archive_solid_thin_icon : archive_solid_icon}
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? archive_thin_icon : archive_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "settings":
      return isActive ? (
        <img
          src={weight == "thin" ? cog_solid_thin_icon : cog_solid_icon}
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? cog_thin_icon : cog_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    default:
      return (
        <img
          src={
            weight == "thin"
              ? arrow_out_right_circle_half_thin
              : arrow_out_right_circle_half
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
  }
};

export const SettingsSidebarIcon = ({
  label,
  isActive = false,
  className = "",
  weight = "base",
}: {
  label?: string;
  isActive?: boolean;
  className?: string;
  weight?: IconWeight;
}) => {
  switch (label) {
    case "account":
      return isActive ? (
        <img
          src={
            weight == "thin"
              ? user_hexagon_solid_thin_icon
              : user_hexagon_solid_icon
          }
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? user_hexagon_thin_icon : user_hexagon_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "appearance":
      return isActive ? (
        <img
          src={weight == "thin" ? palette_solid_thin_icon : palette_solid_icon}
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? palette_thin_icon : palette_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "language":
      return isActive ? (
        <img
          src={
            weight == "thin"
              ? globe_alt_2_solid_thin_icon
              : globe_alt_2_solid_icon
          }
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={weight == "thin" ? globe_alt_2_thin_icon : globe_alt_2_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    default:
      return isActive ? (
        <img
          src={
            weight == "thin"
              ? shield_quarter_solid_thin_icon
              : shield_quarter_solid_icon
          }
          loading="lazy"
          className={`invert-100 ${className ?? ""}`}
        />
      ) : (
        <img
          src={
            weight == "thin" ? shield_quarter_thin_icon : shield_quarter_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
  }
};
