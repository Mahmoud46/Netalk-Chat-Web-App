import type { ReactNode } from "react";

import plus_icon from "../../../assets/icons/emoji_plus.png";
import angry_icon from "../../../assets/icons/emoji_angry.png";
import cool_icon from "../../../assets/icons/emoji_cool.png";
import dizzy_icon from "../../../assets/icons/emoji_dizzy.png";
import meh_icon from "../../../assets/icons/emoji_meh.png";
import sad_icon from "../../../assets/icons/emoji_sad.png";
import wink_smile_icon from "../../../assets/icons/emoji_wink_smile.png";
import type { EmojiType } from "../../../types";

const EmojiIcon = ({
  type,
  className = "",
}: {
  type?: EmojiType | "plus";
  className?: string;
}): ReactNode => {
  switch (type) {
    case "plus":
      return (
        <img src={plus_icon} alt="plus" loading="lazy" className={className} />
      );
    case "angry":
      return (
        <img
          src={angry_icon}
          alt="angry"
          loading="lazy"
          className={className}
        />
      );
    case "cool":
      return (
        <img src={cool_icon} alt="cool" loading="lazy" className={className} />
      );
    case "dizzy":
      return (
        <img
          src={dizzy_icon}
          alt="dizzy"
          loading="lazy"
          className={className}
        />
      );
    case "meh":
      return (
        <img src={meh_icon} alt="meh" loading="lazy" className={className} />
      );
    case "sad":
      return (
        <img src={sad_icon} alt="sad" loading="lazy" className={className} />
      );
    case "wink_smile":
      return (
        <img
          src={wink_smile_icon}
          alt="wink_smile"
          loading="lazy"
          className={className}
        />
      );

    default:
      return <></>;
  }
};

export default EmojiIcon;
