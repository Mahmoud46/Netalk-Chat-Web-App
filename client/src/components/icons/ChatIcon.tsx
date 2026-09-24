import check_icon from "../../assets/icons/chat/check.png";
import checks_icon from "../../assets/icons/chat/checks.png";
import archive_arrow_down_icon from "../../assets/icons/chat/archive_arrow_down.png";
import archive_arrow_up_icon from "../../assets/icons/chat/archive_arrow_up.png";
import paperclip_icon from "../../assets/icons/chat/paperclip.png";
import sticker_icon from "../../assets/icons/chat/sticker.png";
import image_icon from "../../assets/icons/chat/image.png";
import file_icon from "../../assets/icons/chat/file.png";
import reply_icon from "../../assets/icons/chat/reply.png";
import image_plus_icon from "../../assets/icons/chat/image_plus.png";
import file_plus_icon from "../../assets/icons/chat/file_plus.png";
import play_circle_alt_icon from "../../assets/icons/chat/play_circle_alt.png";

import check_thin_icon from "../../assets/icons/chat/check_thin.png";
import checks_thin_icon from "../../assets/icons/chat/checks_thin.png";
import archive_arrow_down_thin_icon from "../../assets/icons/chat/archive_arrow_down_thin.png";
import archive_arrow_up_thin_icon from "../../assets/icons/chat/archive_arrow_up_thin.png";
import paperclip_thin_icon from "../../assets/icons/chat/paperclip_thin.png";
import sticker_thin_icon from "../../assets/icons/chat/sticker_thin.png";
import image_thin_icon from "../../assets/icons/chat/image_thin.png";
import file_thin_icon from "../../assets/icons/chat/file_thin.png";
import reply_thin_icon from "../../assets/icons/chat/reply_thin.png";
import image_plus_thin_icon from "../../assets/icons/chat/image_plus_thin.png";
import file_plus_thin_icon from "../../assets/icons/chat/file_plus_thin.png";
import play_circle_alt_thin_icon from "../../assets/icons/chat/play_circle_alt_thin.png";

import check_bold_icon from "../../assets/icons/chat/check_bold.png";
import reply_bold_icon from "../../assets/icons/chat/reply_bold.png";
import image_plus_bold_icon from "../../assets/icons/chat/image_plus_bold.png";
import file_plus_bold_icon from "../../assets/icons/chat/file_plus_bold.png";
import play_circle_alt_bold_icon from "../../assets/icons/chat/play_circle_alt_bold.png";

import archive_arrow_down_solid_thin_icon from "../../assets/icons/chat/archive_arrow_down_solid_thin.png";
import archive_arrow_down_solid_icon from "../../assets/icons/chat/archive_arrow_down_solid.png";
import archive_arrow_up_solid_thin_icon from "../../assets/icons/chat/archive_arrow_up_solid_thin.png";
import archive_arrow_up_solid_icon from "../../assets/icons/chat/archive_arrow_up_solid.png";
import image_solid_icon from "../../assets/icons/chat/image_solid.png";
import image_solid_thin_icon from "../../assets/icons/chat/image_solid_thin.png";
import file_solid_icon from "../../assets/icons/chat/file_solid.png";
import file_solid_thin_icon from "../../assets/icons/chat/file_solid_thin.png";

import type { IconWeight, MessageStatus } from "../../types";

export const MessageStatusIcon = ({
  status,
  className = "",
  weight = "base",
}: {
  status: MessageStatus;
  className?: string;
  weight?: IconWeight;
}) => {
  switch (status) {
    case "sent":
      return (
        <img
          src={
            weight == "thin"
              ? check_thin_icon
              : weight == "bold"
                ? check_bold_icon
                : check_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "delivered":
      return (
        <img
          src={weight == "thin" ? checks_thin_icon : checks_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "read":
      return (
        <img
          src={weight == "thin" ? checks_thin_icon : checks_icon}
          loading="lazy"
          className={`major-icon ${className ?? ""}`}
        />
      );

    default:
      return <></>;
  }
};

export default function ChatIcon({
  label,
  className = "",
  weight = "base",
  solid = false,
}: {
  label?: string;
  className?: string;
  weight?: IconWeight;
  solid?: boolean;
}) {
  switch (label) {
    case "archive_arrow_down":
      return (
        <img
          src={
            solid
              ? weight == "thin"
                ? archive_arrow_down_solid_thin_icon
                : archive_arrow_down_solid_icon
              : weight == "thin"
                ? archive_arrow_down_thin_icon
                : archive_arrow_down_icon
          }
          loading="lazy"
          className={`${solid ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "archive_arrow_up":
      return (
        <img
          src={
            solid
              ? weight == "thin"
                ? archive_arrow_up_solid_thin_icon
                : archive_arrow_up_solid_icon
              : weight == "thin"
                ? archive_arrow_up_thin_icon
                : archive_arrow_up_icon
          }
          loading="lazy"
          className={`${solid ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "paperclip":
      return (
        <img
          src={weight == "thin" ? paperclip_thin_icon : paperclip_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "sticker":
      return (
        <img
          src={weight == "thin" ? sticker_thin_icon : sticker_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "image":
      return (
        <img
          src={
            solid
              ? weight == "thin"
                ? image_solid_thin_icon
                : image_solid_icon
              : weight == "thin"
                ? image_thin_icon
                : image_icon
          }
          loading="lazy"
          className={`${solid ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "file":
      return (
        <img
          src={
            solid
              ? weight == "thin"
                ? file_solid_thin_icon
                : file_solid_icon
              : weight == "thin"
                ? file_thin_icon
                : file_icon
          }
          loading="lazy"
          className={`${solid ? "invert-100" : "main-icon"} ${className ?? ""}`}
        />
      );
    case "file_plus":
      return (
        <img
          src={
            weight == "thin"
              ? file_plus_thin_icon
              : weight == "bold"
                ? file_plus_bold_icon
                : file_plus_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "image_plus":
      return (
        <img
          src={
            weight == "thin"
              ? image_plus_thin_icon
              : weight == "bold"
                ? image_plus_bold_icon
                : image_plus_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "play_circle_alt":
      return (
        <img
          src={
            weight == "thin"
              ? play_circle_alt_thin_icon
              : weight == "bold"
                ? play_circle_alt_bold_icon
                : play_circle_alt_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "reply":
      return (
        <img
          src={
            weight == "thin"
              ? reply_thin_icon
              : weight == "bold"
                ? reply_bold_icon
                : reply_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    default:
      return <></>;
  }
}
