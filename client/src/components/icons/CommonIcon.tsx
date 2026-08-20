import type { IconWeight } from "../../types";
// Base icons
import search_big_icon from "../../assets/icons/common/search_big.png";
import chevron_right_icon from "../../assets/icons/common/chevron_right.png";
import trash_icon from "../../assets/icons/common/trash.png";
import dots_vertical_rounded_icon from "../../assets/icons/common/dots_vertical_rounded.png";
import phone_icon from "../../assets/icons/common/phone.png";
import paper_plane_icon from "../../assets/icons/common/paper_plane.png";
import edit_icon from "../../assets/icons/common/edit.png";
import user_minus_icon from "../../assets/icons/common/user_minus.png";
import bell_slash_icon from "../../assets/icons/common/bell_slash.png";
import bell_icon from "../../assets/icons/common/bell.png";
import user_x_icon from "../../assets/icons/common/user_x.png";
import user_plus_icon from "../../assets/icons/common/user_plus.png";
import location_alt_icon from "../../assets/icons/common/location_alt.png";
import envelope_alt_icon from "../../assets/icons/common/envelope_alt.png";
import plus_icon from "../../assets/icons/common/plus.png";
import save_icon from "../../assets/icons/common/save.png";
import party_icon from "../../assets/icons/common/party.png";
import calendar_star_icon from "../../assets/icons/common/calendar_star.png";
import form_icon from "../../assets/icons/common/form.png";
import key_icon from "../../assets/icons/common/key.png";
import user_check_icon from "../../assets/icons/common/user_check.png";
import translate_icon from "../../assets/icons/common/translate.png";
import stroke_freehand_icon from "../../assets/icons/common/stroke_freehand.png";
import sparkles_icon from "../../assets/icons/common/sparkles.png";
import arrow_out_up_right_circle_icon from "../../assets/icons/common/arrow_out_up_right_circle.png";
import loader_lines_alt from "../../assets/icons/common/loader_lines_alt.png";
import copy_icon from "../../assets/icons/common/copy.png";
import copy_check_icon from "../../assets/icons/common/copy_check.png";
import eye_icon from "../../assets/icons/common/eye.png";
import eye_slash_icon from "../../assets/icons/common/eye_slash.png";
import male_icon from "../../assets/icons/common/male.png";
import female_icon from "../../assets/icons/common/female.png";
import share_icon from "../../assets/icons/common/share.png";
import cog_icon from "../../assets/icons/common/cog.png";

// Thin icons
import search_big_thin_icon from "../../assets/icons/common/search_big_thin.png";
import chevron_right_thin_icon from "../../assets/icons/common/chevron_right_thin.png";
import trash_thin_icon from "../../assets/icons/common/trash_thin.png";
import dots_vertical_rounded_thin_icon from "../../assets/icons/common/dots_vertical_rounded_thin.png";
import phone_thin_icon from "../../assets/icons/common/phone_thin.png";
import paper_plane_thin_icon from "../../assets/icons/common/paper_plane_thin.png";
import edit_thin_icon from "../../assets/icons/common/edit_thin.png";
import user_minus_thin_icon from "../../assets/icons/common/user_minus_thin.png";
import bell_slash_thin_icon from "../../assets/icons/common/bell_slash_thin.png";
import bell_thin_icon from "../../assets/icons/common/bell_thin.png";
import user_x_thin_icon from "../../assets/icons/common/user_x_thin.png";
import user_plus_thin_icon from "../../assets/icons/common/user_plus_thin.png";
import location_alt_thin_icon from "../../assets/icons/common/location_alt_thin.png";
import envelope_alt_thin_icon from "../../assets/icons/common/envelope_alt_thin.png";
import plus_thin_icon from "../../assets/icons/common/plus_thin.png";
import save_thin_icon from "../../assets/icons/common/save_thin.png";
import party_thin_icon from "../../assets/icons/common/party_thin.png";
import calendar_star_thin_icon from "../../assets/icons/common/calendar_star_thin.png";
import form_thin_icon from "../../assets/icons/common/form_thin.png";
import key_thin_icon from "../../assets/icons/common/key_thin.png";
import user_check_thin_icon from "../../assets/icons/common/user_check_thin.png";
import translate_thin_icon from "../../assets/icons/common/translate_thin.png";
import stroke_freehand_thin_icon from "../../assets/icons/common/stroke_freehand_thin.png";
import sparkles_thin_icon from "../../assets/icons/common/sparkles_thin.png";
import arrow_out_up_right_circle_thin_icon from "../../assets/icons/common/arrow_out_up_right_circle_thin.png";
import loader_lines_alt_thin from "../../assets/icons/common/loader_lines_alt_thin.png";
import copy_thin_icon from "../../assets/icons/common/copy_thin.png";
import copy_check_thin_icon from "../../assets/icons/common/copy_check_thin.png";
import eye_thin_icon from "../../assets/icons/common/eye_thin.png";
import eye_slash_thin_icon from "../../assets/icons/common/eye_slash_thin.png";
import male_thin_icon from "../../assets/icons/common/male_thin.png";
import female_thin_icon from "../../assets/icons/common/female_thin.png";
import share_thin_icon from "../../assets/icons/common/share_thin.png";
import cog_thin_icon from "../../assets/icons/common/cog_thin.png";

// Bold
import eye_bold_icon from "../../assets/icons/common/eye_bold.png";
import eye_slash_bold_icon from "../../assets/icons/common/eye_slash_bold.png";
import male_bold_icon from "../../assets/icons/common/male_bold.png";
import female_bold_icon from "../../assets/icons/common/female_bold.png";
import share_bold_icon from "../../assets/icons/common/share_bold.png";
import cog_bold_icon from "../../assets/icons/common/cog_bold.png";

// Soild base icons
import dots_vertical_rounded_solid_icon from "../../assets/icons/common/dots_vertical_rounded_solid.png";
import phone_solid_icon from "../../assets/icons/common/phone_solid.png";
import paper_plane_solid_icon from "../../assets/icons/common/paper_plane_solid.png";
import envelope_alt_solid_icon from "../../assets/icons/common/envelope_alt_solid.png";

// Solid thin icons
import phone_solid_thin_icon from "../../assets/icons/common/phone_solid_thin.png";
import paper_plane_solid_thin_icon from "../../assets/icons/common/paper_plane_solid_thin.png";
import envelope_alt_solid_thin_icon from "../../assets/icons/common/envelope_alt_solid_thin.png";

export default function CommonIcon({
  label,
  className = "",
  weight = "base",
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
    case "loader_lines_alt":
      return (
        <img
          src={weight == "thin" ? loader_lines_alt_thin : loader_lines_alt}
          loading="lazy"
          className={`major-icon ${className ?? ""}`}
        />
      );
    case "copy":
      return (
        <img
          src={weight == "thin" ? copy_thin_icon : copy_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "copy_check":
      return (
        <img
          src={weight == "thin" ? copy_check_thin_icon : copy_check_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "eye":
      return (
        <img
          src={
            weight == "thin"
              ? eye_thin_icon
              : weight == "bold"
                ? eye_bold_icon
                : eye_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "eye_slash":
      return (
        <img
          src={
            weight == "thin"
              ? eye_slash_thin_icon
              : weight == "bold"
                ? eye_slash_bold_icon
                : eye_slash_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "male":
      return (
        <img
          src={
            weight == "thin"
              ? male_thin_icon
              : weight == "bold"
                ? male_bold_icon
                : male_icon
          }
          loading="lazy"
          className={`${soild ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "female":
      return (
        <img
          src={
            weight == "thin"
              ? female_thin_icon
              : weight == "bold"
                ? female_bold_icon
                : female_icon
          }
          loading="lazy"
          className={`${soild ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "share":
      return (
        <img
          src={
            weight == "thin"
              ? share_thin_icon
              : weight == "bold"
                ? share_bold_icon
                : share_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "cog":
      return (
        <img
          src={
            weight == "thin"
              ? cog_thin_icon
              : weight == "bold"
                ? cog_bold_icon
                : cog_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    default:
      return <></>;
  }
}
