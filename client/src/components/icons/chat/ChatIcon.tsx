import check_icon from "./icons/check.png";
import checks_icon from "./icons/checks.png";
import archive_arrow_down_icon from "./icons/archive_arrow_down.png";
import archive_arrow_up_icon from "./icons/archive_arrow_up.png";
import paperclip_icon from "./icons/paperclip.png";
import sticker_icon from "./icons/sticker.png";
import image_icon from "./icons/image.png";
import file_icon from "./icons/file.png";

import check_thin_icon from "./icons/check_thin.png";
import checks_thin_icon from "./icons/checks_thin.png";
import archive_arrow_down_thin_icon from "./icons/archive_arrow_down_thin.png";
import archive_arrow_up_thin_icon from "./icons/archive_arrow_up_thin.png";
import paperclip_thin_icon from "./icons/paperclip_thin.png";
import sticker_thin_icon from "./icons/sticker_thin.png";
import image_thin_icon from "./icons/image_thin.png";
import file_thin_icon from "./icons/file_thin.png";

import check_bold_icon from "./icons/check_bold.png";

import type { IconWeight, MessageStatus } from "../../../types";

export const MessageStatusIcon = ({
  status,
  className = "",
  weight = "normal",
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
  weight = "normal",
}: {
  label?: string;
  className?: string;
  weight?: IconWeight;
}) {
  switch (label) {
    case "archive_arrow_down":
      return (
        <img
          src={
            weight == "thin"
              ? archive_arrow_down_thin_icon
              : archive_arrow_down_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "archive_arrow_up":
      return (
        <img
          src={
            weight == "thin"
              ? archive_arrow_up_thin_icon
              : archive_arrow_up_icon
          }
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
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
          src={weight == "thin" ? image_thin_icon : image_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "file":
      return (
        <img
          src={weight == "thin" ? file_thin_icon : file_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    default:
      return <></>;
  }
}
