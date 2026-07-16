import type { IconWeight } from "../../../types";
import search_big_icon from "./icons/search_big.png";
import chevron_right_icon from "./icons/chevron_right.png";
import trash_icon from "./icons/trash.png";
import dots_vertical_rounded_icon from "./icons/dots_vertical_rounded.png";
import phone_icon from "./icons/phone.png";
import paper_plane_icon from "./icons/paper_plane.png";
import edit_icon from "./icons/edit.png";
import user_minus_icon from "./icons/user_minus.png";
import bell_slash_icon from "./icons/bell_slash.png";
import bell_icon from "./icons/bell.png";
import user_x_icon from "./icons/user_x.png";
import user_plus_icon from "./icons/user_plus.png";
import location_alt_icon from "./icons/location_alt.png";
import envelope_alt_icon from "./icons/envelope_alt.png";
import plus_icon from "./icons/plus.png";
import save_icon from "./icons/save.png";
import party_icon from "./icons/party.png";
import calendar_star_icon from "./icons/calendar_star.png";
import form_icon from "./icons/form.png";
import key_icon from "./icons/key.png";
import user_check_icon from "./icons/user_check.png";
import translate_icon from "./icons/translate.png";
import stroke_freehand_icon from "./icons/stroke_freehand.png";
import sparkles_icon from "./icons/sparkles.png";
import arrow_out_up_right_circle_icon from "./icons/arrow_out_up_right_circle.png";

import search_big_thin_icon from "./icons/search_big_thin.png";
import chevron_right_thin_icon from "./icons/chevron_right_thin.png";
import trash_thin_icon from "./icons/trash_thin.png";
import dots_vertical_rounded_thin_icon from "./icons/dots_vertical_rounded_thin.png";
import phone_thin_icon from "./icons/phone_thin.png";
import paper_plane_thin_icon from "./icons/paper_plane_thin.png";
import edit_thin_icon from "./icons/edit_thin.png";
import user_minus_thin_icon from "./icons/user_minus_thin.png";
import bell_slash_thin_icon from "./icons/bell_slash_thin.png";
import bell_thin_icon from "./icons/bell_thin.png";
import user_x_thin_icon from "./icons/user_x_thin.png";
import user_plus_thin_icon from "./icons/user_plus_thin.png";
import location_alt_thin_icon from "./icons/location_alt_thin.png";
import envelope_alt_thin_icon from "./icons/envelope_alt_thin.png";
import plus_thin_icon from "./icons/plus_thin.png";
import save_thin_icon from "./icons/save_thin.png";
import party_thin_icon from "./icons/party_thin.png";
import calendar_star_thin_icon from "./icons/calendar_star_thin.png";
import form_thin_icon from "./icons/form_thin.png";
import key_thin_icon from "./icons/key_thin.png";
import user_check_thin_icon from "./icons/user_check_thin.png";
import translate_thin_icon from "./icons/translate_thin.png";
import stroke_freehand_thin_icon from "./icons/stroke_freehand_thin.png";
import sparkles_thin_icon from "./icons/sparkles_thin.png";
import arrow_out_up_right_circle_thin_icon from "./icons/arrow_out_up_right_circle_thin.png";

import dots_vertical_rounded_solid_icon from "./icons/dots_vertical_rounded_solid.png";
import phone_solid_icon from "./icons/phone_solid.png";
import paper_plane_solid_icon from "./icons/paper_plane_solid.png";
import envelope_alt_solid_icon from "./icons/envelope_alt_solid.png";

import phone_solid_thin_icon from "./icons/phone_solid_thin.png";
import paper_plane_solid_thin_icon from "./icons/paper_plane_solid_thin.png";
import envelope_alt_solid_thin_icon from "./icons/envelope_alt_solid_thin.png";

export default function CommonIcon({
  label,
  className = "",
  weight = "normal",
  soild = false,
}: {
  label?: string;
  className?: string;
  weight?: IconWeight;
  soild?: boolean;
}) {
  switch (label) {
    case "search":
      return (
        <img
          src={weight == "thin" ? search_big_thin_icon : search_big_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "chevron_right":
      return (
        <img
          src={weight == "thin" ? chevron_right_thin_icon : chevron_right_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "trash":
      return (
        <img
          src={weight == "thin" ? trash_thin_icon : trash_icon}
          loading="lazy"
          className={`danger-icon ${className ?? ""}`}
        />
      );

    case "dots_vertical_rounded":
      return (
        <img
          src={
            soild
              ? dots_vertical_rounded_solid_icon
              : weight == "thin"
                ? dots_vertical_rounded_thin_icon
                : dots_vertical_rounded_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    case "phone":
      return (
        <img
          src={
            soild
              ? weight == "thin"
                ? phone_solid_thin_icon
                : phone_solid_icon
              : weight == "thin"
                ? phone_thin_icon
                : phone_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "paper_plane":
      return (
        <img
          src={
            soild
              ? weight == "thin"
                ? paper_plane_solid_thin_icon
                : paper_plane_solid_icon
              : weight == "thin"
                ? paper_plane_thin_icon
                : paper_plane_icon
          }
          loading="lazy"
          className={`${soild ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "edit":
      return (
        <img
          src={weight == "thin" ? edit_thin_icon : edit_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "save":
      return (
        <img
          src={weight == "thin" ? save_thin_icon : save_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "user_minus":
      return (
        <img
          src={weight == "thin" ? user_minus_thin_icon : user_minus_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "user_plus":
      return (
        <img
          src={weight == "thin" ? user_plus_thin_icon : user_plus_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "bell_slash":
      return (
        <img
          src={weight == "thin" ? bell_slash_thin_icon : bell_slash_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "bell":
      return (
        <img
          src={weight == "thin" ? bell_thin_icon : bell_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "user_x":
      return (
        <img
          src={weight == "thin" ? user_x_thin_icon : user_x_icon}
          loading="lazy"
          className={`danger-icon ${className ?? ""}`}
        />
      );
    case "location_alt":
      return (
        <img
          src={weight == "thin" ? location_alt_thin_icon : location_alt_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "envelope_alt":
      return (
        <img
          src={
            soild
              ? weight == "thin"
                ? envelope_alt_solid_thin_icon
                : envelope_alt_solid_icon
              : weight == "thin"
                ? envelope_alt_thin_icon
                : envelope_alt_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "party":
      return (
        <img
          src={weight == "thin" ? party_thin_icon : party_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "calendar_star":
      return (
        <img
          src={weight == "thin" ? calendar_star_thin_icon : calendar_star_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "form":
      return (
        <img
          src={weight == "thin" ? form_thin_icon : form_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "key":
      return (
        <img
          src={weight == "thin" ? key_thin_icon : key_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "user_check":
      return (
        <img
          src={weight == "thin" ? user_check_thin_icon : user_check_icon}
          loading="lazy"
          className={`success-icon ${className ?? ""}`}
        />
      );
    case "translate":
      return (
        <img
          src={weight == "thin" ? translate_thin_icon : translate_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "stroke_freehand":
      return (
        <img
          src={
            weight == "thin" ? stroke_freehand_thin_icon : stroke_freehand_icon
          }
          loading="lazy"
          className={`major-icon ${className ?? ""}`}
        />
      );
    case "sparkles":
      return (
        <img
          src={weight == "thin" ? sparkles_thin_icon : sparkles_icon}
          loading="lazy"
          className={`major-icon ${className ?? ""}`}
        />
      );
    case "arrow_out_up_right_circle":
      return (
        <img
          src={
            weight == "thin"
              ? arrow_out_up_right_circle_thin_icon
              : arrow_out_up_right_circle_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "plus":
      return (
        <img
          src={weight == "thin" ? plus_thin_icon : plus_icon}
          loading="lazy"
          className={`${soild ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );

    default:
      return <></>;
  }
}
