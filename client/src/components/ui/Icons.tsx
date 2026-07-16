import type { ReactNode } from "react";

import favicon from "../../assets/icons/favicon.png";
import favicon_dark from "../../assets/icons/favicon_dark.png";

import search_icon from "../../assets/icons/search.png";
import arrow_icon from "../../assets/icons/chevron_right.png";

import sent_icon from "../../assets/icons/check.png";
import delivered_icon from "../../assets/icons/check_check.png";
import read_icon from "../../assets/icons/check_check_active.png";

import more_vertical_icon from "../../assets/icons/more_vertical.png";
import call_icon from "../../assets/icons/call.png";

import trash_icon from "../../assets/icons/trash.png";
import trash_dark_icon from "../../assets/icons/trash_dark.png";

import archive_in_icon from "../../assets/icons/archive_in.png";
import archive_out_icon from "../../assets/icons/archive_out.png";

import send_icon from "../../assets/icons/send.png";

import image_plus_icon from "../../assets/icons/image_plus.png";
import file_plus_icon from "../../assets/icons/file_plus.png";
import video_plus_icon from "../../assets/icons/video_plus.png";
import audio_plus_icon from "../../assets/icons/audio_plus.png";
import attachment_icon from "../../assets/icons/attachment.png";

import emoji_icon from "../../assets/icons/emoji_wink_smile.png";

import location_icon from "../../assets/icons/location.png";
import user_plus_icon from "../../assets/icons/user_plus.png";
import user_minus_icon from "../../assets/icons/user_minus.png";
import mute_icon from "../../assets/icons/mute.png";
import unmute_icon from "../../assets/icons/unmute.png";
import block_icon from "../../assets/icons/block.png";
import unblock_icon from "../../assets/icons/unblock.png";
import edit_icon from "../../assets/icons/edit.png";
import phone_icon from "../../assets/icons/phone.png";
import phone_light_icon from "../../assets/icons/call.png";
import email_icon from "../../assets/icons/email.png";
import email_light_icon from "../../assets/icons/email_light.png";

import plus_icon from "../../assets/icons/plus_white.png";
import freehand_stroke_icon from "../../assets/icons/freehand_stroke.png";

import sparkles_icon from "../../assets/icons/sparkles.png";

import start_chat_icon from "../../assets/icons/start_chat.png";

import celebrate_birthday_icon from "../../assets/icons/celebrate_birthday.png";

import address_icon from "../../assets/icons/address.png";
import calendar_icon from "../../assets/icons/calendar.png";
import contacts_info_icon from "../../assets/icons/contacts_info.png";

import plus_normal_icon from "../../assets/icons/plus_normal.png";
import save_icon from "../../assets/icons/save.png";

import key_icon from "../../assets/icons/key.png";
import translate_icon from "../../assets/icons/translate.png";

import type { MessageStatus, ThemeMode } from "../../types";

export const NetalkIcon = ({
  theme = "light",
  className = "",
}: {
  theme?: ThemeMode;
  className?: string;
}): ReactNode =>
  theme == "light" ? (
    <img src={favicon} loading="lazy" className={className ?? ""} />
  ) : (
    <img src={favicon_dark} loading="lazy" className={className ?? ""} />
  );

export const SearchIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={search_icon} alt="search" loading="lazy" className={className} />
);

export const ArrowIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={arrow_icon} alt="arrow" loading="lazy" className={className} />
);

export const TrashIcon = ({
  theme = "light",
  className = "",
}: {
  theme?: ThemeMode;
  className?: string;
}): ReactNode =>
  theme == "light" ? (
    <img src={trash_icon} loading="lazy" className={className} />
  ) : (
    <img src={trash_dark_icon} loading="lazy" className={className} />
  );

export const ArchiveIcon = ({
  isArchived = false,
  className = "",
}: {
  isArchived?: boolean;
  className?: string;
}): ReactNode =>
  !isArchived ? (
    <img src={archive_in_icon} loading="lazy" className={className} />
  ) : (
    <img src={archive_out_icon} loading="lazy" className={className} />
  );

export const SendIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => <img src={send_icon} loading="lazy" className={className} />;

export const ImagePlusIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={image_plus_icon} loading="lazy" className={className} />
);

export const AudioPlusIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={audio_plus_icon} loading="lazy" className={className} />
);

export const FilePlusIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={file_plus_icon} loading="lazy" className={className} />
);

export const VideoPlusIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={video_plus_icon} loading="lazy" className={className} />
);

export const AttachmentIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={attachment_icon} loading="lazy" className={className} />
);

export const EmojiIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => <img src={emoji_icon} loading="lazy" className={className} />;

export const MessageStatusIcon = ({
  status = "read",
  className = "",
}: {
  status?: MessageStatus;
  className?: string;
}): ReactNode => {
  switch (status) {
    case "sent":
      return (
        <img src={sent_icon} alt="sent" loading="lazy" className={className} />
      );
    case "delivered":
      return (
        <img
          src={delivered_icon}
          alt="delivered"
          loading="lazy"
          className={className}
        />
      );

    default:
      return (
        <img src={read_icon} alt="read" loading="lazy" className={className} />
      );
  }
};

export const MoreVerticalIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img
    src={more_vertical_icon}
    alt="more"
    loading="lazy"
    className={className}
  />
);

export const CallIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img src={call_icon} alt="call" loading="lazy" className={className} />
);

export const LocationIcon = ({
  className = "",
}: {
  className?: string;
}): ReactNode => (
  <img
    src={location_icon}
    alt="location"
    loading="lazy"
    className={className}
  />
);

export const UserContactIcon = ({
  isContact = false,
  className = "",
}: {
  isContact?: boolean;
  className?: string;
}): ReactNode =>
  isContact ? (
    <img
      src={user_minus_icon}
      alt="remove_user"
      loading="lazy"
      className={className}
    />
  ) : (
    <img
      src={user_plus_icon}
      alt="add_user"
      loading="lazy"
      className={className}
    />
  );

export const MuteIcon = ({
  isMuted = false,
  className = "",
}: {
  isMuted?: boolean;
  className?: string;
}): ReactNode =>
  isMuted ? (
    <img src={unmute_icon} alt="unmute" loading="lazy" className={className} />
  ) : (
    <img src={mute_icon} alt="mute" loading="lazy" className={className} />
  );

export const BlockIcon = ({
  isBlocked = false,
  className = "",
}: {
  isBlocked?: boolean;
  className?: string;
}): ReactNode =>
  isBlocked ? (
    <img
      src={unblock_icon}
      alt="unblock"
      loading="lazy"
      className={className}
    />
  ) : (
    <img src={block_icon} alt="unblock" loading="lazy" className={className} />
  );

export const EditIcon = ({ className = "" }: { className?: string }) => (
  <img src={edit_icon} alt="edit" className={className} loading="lazy" />
);

export const PhoneIcon = ({
  className = "",
  weight = "semi-bold",
}: {
  className?: string;
  weight?: "light" | "semi-bold" | "bold";
}) => {
  switch (weight) {
    case "light":
      return (
        <img
          src={phone_light_icon}
          alt="phone"
          className={className}
          loading="lazy"
        />
      );

    default:
      return (
        <img
          src={phone_icon}
          alt="phone"
          className={className}
          loading="lazy"
        />
      );
  }
};
export const EmailIcon = ({
  className = "",
  weight = "semi-bold",
}: {
  className?: string;
  weight?: "light" | "semi-bold" | "bold";
}) => {
  switch (weight) {
    case "semi-bold":
      return (
        <img
          src={email_icon}
          alt="email"
          className={className}
          loading="lazy"
        />
      );
    case "light":
      return (
        <img
          src={email_light_icon}
          alt="email"
          className={className}
          loading="lazy"
        />
      );

    default:
      <img src={email_icon} alt="email" className={className} loading="lazy" />;
  }
};
export const PlusIcon = ({
  className = "",
  color = "white",
}: {
  className?: string;
  color?: "white" | "base";
}) => {
  switch (color) {
    case "base":
      return (
        <img
          src={plus_normal_icon}
          alt="plus"
          className={className}
          loading="lazy"
        />
      );

    default:
      return (
        <img src={plus_icon} alt="plus" className={className} loading="lazy" />
      );
  }
};

export const SparklesIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={sparkles_icon}
    alt="sparkles"
    className={className}
    loading="lazy"
  />
);

export const FreehandStrokeIcon = ({
  className = "",
}: {
  className?: string;
}) => (
  <img
    src={freehand_stroke_icon}
    alt="freehand-stroke"
    className={className}
    loading="lazy"
  />
);

export const StartChatIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={start_chat_icon}
    alt="start-chat-icon"
    className={className}
    loading="lazy"
  />
);
export const CelebrateBirthdayIcon = ({
  className = "",
}: {
  className?: string;
}) => (
  <img
    src={celebrate_birthday_icon}
    alt="celebrate-birthday-icon"
    className={className}
    loading="lazy"
  />
);
export const AddressIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={address_icon}
    alt="address-icon"
    className={className}
    loading="lazy"
  />
);

export const CalendarIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={calendar_icon}
    alt="calendar-icon"
    className={className}
    loading="lazy"
  />
);
export const ContactsInfoIcon = ({
  className = "",
}: {
  className?: string;
}) => (
  <img
    src={contacts_info_icon}
    alt="contacts-info-icon"
    className={className}
    loading="lazy"
  />
);
export const SaveIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={save_icon}
    alt="contacts-info-icon"
    className={className}
    loading="lazy"
  />
);
export const KeyIcon = ({ className = "" }: { className?: string }) => (
  <img src={key_icon} alt="key-icon" className={className} loading="lazy" />
);
export const TranslateIcon = ({ className = "" }: { className?: string }) => (
  <img
    src={translate_icon}
    alt="translate-icon"
    className={className}
    loading="lazy"
  />
);
