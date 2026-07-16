// Main sidebar
import archive_icon from "./icons/archive.png";
import inbox_icon from "./icons/inbox.png";
import cog_icon from "./icons/cog.png";
import group_icon from "./icons/group.png";
import arrow_out_right_circle_half from "./icons/arrow_out_right_circle_half.png";

import archive_solid_icon from "./icons/archive_solid.png";
import inbox_solid_icon from "./icons/inbox_solid.png";
import cog_solid_icon from "./icons/cog_solid.png";
import group_solid_icon from "./icons/group_solid.png";

import inbox_thin_icon from "./icons/inbox_thin.png";
import group_thin_icon from "./icons/group_thin.png";
import archive_thin_icon from "./icons/archive_thin.png";
import cog_thin_icon from "./icons/cog_thin.png";
import arrow_out_right_circle_half_thin from "./icons/arrow_out_right_circle_half_thin.png";

import inbox_solid_thin_icon from "./icons/inbox_solid_thin.png";
import group_solid_thin_icon from "./icons/group_solid_thin.png";
import archive_solid_thin_icon from "./icons/archive_solid_thin.png";
import cog_solid_thin_icon from "./icons/cog_solid_thin.png";

// Settings sidebar
import user_hexagon_icon from "./icons/user_hexagon.png";
import palette_icon from "./icons/palette.png";
import globe_alt_2_icon from "./icons/globe_alt_2.png";
import shield_quarter_icon from "./icons/shield_quarter.png";

import user_hexagon_solid_icon from "./icons/user_hexagon_solid.png";
import palette_solid_icon from "./icons/palette_solid.png";
import globe_alt_2_solid_icon from "./icons/globe_alt_2_solid.png";
import shield_quarter_solid_icon from "./icons/shield_quarter_solid.png";

import user_hexagon_thin_icon from "./icons/user_hexagon_thin.png";
import palette_thin_icon from "./icons/palette_thin.png";
import globe_alt_2_thin_icon from "./icons/globe_alt_2_thin.png";
import shield_quarter_thin_icon from "./icons/shield_quarter_thin.png";

import user_hexagon_solid_thin_icon from "./icons/user_hexagon_solid_thin.png";
import palette_solid_thin_icon from "./icons/palette_solid_thin.png";
import globe_alt_2_solid_thin_icon from "./icons/globe_alt_2_solid_thin.png";
import shield_quarter_solid_thin_icon from "./icons/shield_quarter_solid_thin.png";

import type { ReactNode } from "react";
import type { IconWeight } from "../../../types";

export const MainSidebarIcon = ({
  label,
  isActive = false,
  className = "",
  weight = "normal",
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
  weight = "normal",
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
