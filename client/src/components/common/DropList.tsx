import { lazy, useState, type ReactNode } from "react";
import { useAuth, useChat } from "../../hooks";
import ChatIcon from "../icons/ChatIcon";
import CommonIcon from "../icons/CommonIcon";
import { EMOJIS_LIST } from "../../config/emojis";
import EmojiIcon from "../icons/EmojiIcon";
import { LANGUAGES } from "../../config/languages";
import type { AuthNUser, LanguageCode, User } from "../../types";
import Label from "./Label";
import { copyToClipboard } from "../../utils/helpers";
import { formatPhoneNumber } from "../../utils/format";
import SocialIcon from "../icons/SocialIcon";
import { Link } from "react-router-dom";

const BlockedUserCard = lazy(() =>
  import("../common/Card").then((module) => ({
    default: module.BlockedUserCard,
  })),
);

export const ChatDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  const { authNUser } = useAuth(),
    { currentChat } = useChat(),
    isArchived = authNUser?.archivedChats.includes(currentChat?._id as string);
  return (
    <div
      className={`absolute top-7/6 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit self-end rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon
          label={isArchived ? "archive_arrow_up" : "archive_arrow_down"}
          weight="thin"
          className="size-6.5"
        />
        {isArchived ? "Unarchive" : "Archive"}
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger hover:bg-background-light-danger dark:hover:bg-background-dark-danger w-full flex justify-start gap-3 items-center rounded-2xl pr-3">
        <CommonIcon label="trash" className="size-6.5" weight="thin" />
        Delete
      </button>
    </div>
  );
};

export const AttachmentDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute bottom-7/6 left-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="image" weight="thin" className="size-6.5" />
        Image or Video
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="file" weight="thin" className="size-6.5" />
        File or Document
      </button>
    </div>
  );
};

export const ContactEntryDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  const { currentContactEntry } = useChat(),
    { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(currentContactEntry?._id ?? "") ?? false,
    isMuted: boolean =
      authNUser?.mutedUsers.includes(currentContactEntry?._id ?? "") ?? false;
  return (
    <div
      className={`absolute top-0 z-10 -right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon label="edit" weight="thin" className="size-6.5" />
        Edit
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon label="user_minus" weight="thin" className="size-6.5" />
        Delete
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon
          label={isMuted ? "bell" : "bell_slash"}
          weight="thin"
          className="size-6.5"
        />
        {isMuted ? "Unmute" : "Mute"}
      </button>
      <button
        className={`cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger ${isBlocked ? "hover:bg-green-400/10 dark:hover:bg-green-700/20" : "hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
      >
        <CommonIcon
          label={isBlocked ? "" : "user_x"}
          weight="thin"
          className="size-6.5"
        />
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
};

export const BlockedCardDropList = ({
  userId,
  isActive = false,
}: {
  isActive?: boolean;
  userId: string;
}): ReactNode => {
  const { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(userId ?? "") ?? false,
    isMuted: boolean = authNUser?.mutedUsers.includes(userId ?? "") ?? false;
  return (
    <div
      className={`absolute bottom-5/6 z-10 -right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button
        className={`cursor-pointer p-2 text-sm ${isBlocked ? "hover:bg-background-dark-success/9 text-background-dark-success" : "bg-foreground-light-danger dark:bg-foreground-dark-danger hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
      >
        <CommonIcon label="user_check" weight="thin" className="size-6.5" />
        Unblock
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon
          label={isMuted ? "bell" : "bell_slash"}
          weight="thin"
          className="size-6.5"
        />
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export const EmojiDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute bottom-7/6 left-15 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-2xl p-2 grid grid-cols-4 scale-0 ${isActive && "scale-100"} transition-all ease-in-out`}
    >
      {EMOJIS_LIST.map((emoji) => (
        <button
          key={emoji}
          className="group cursor-pointer p-2 flex-none text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary flex justify-start items-center rounded-xl"
        >
          <EmojiIcon
            label={emoji}
            className="size-6 group-hover:scale-150 ease-in-out transition-all"
          />
        </button>
      ))}
    </div>
  );
};
export const EmojiDropListHorizontal = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute flex max-w-full bottom-5 left-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-2xl p-2 overflow-auto scale-0 ${isActive && "scale-100"} transition-all ease-in-out`}
    >
      {EMOJIS_LIST.map((emoji) => (
        <button
          key={emoji}
          className="group cursor-pointer p-2 flex-none text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary flex justify-start items-center rounded-xl"
        >
          <EmojiIcon
            label={emoji}
            className="size-6 group-hover:scale-150 ease-in-out transition-all"
          />
        </button>
      ))}
    </div>
  );
};

export const MessageDropList = ({
  isActive = false,
  isLeft = false,
  showTranslateButton = false,
}: {
  isActive?: boolean;
  isLeft?: boolean;
  showTranslateButton?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute top-0 z-10 ${isLeft ? "left-12" : "right-12"} bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button
        type="button"
        className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
      >
        <ChatIcon label="reply" weight="thin" className="size-6.5" />
        Reply
      </button>
      <button
        type="button"
        className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
      >
        <CommonIcon label="edit" weight="thin" className="size-6.5" />
        Edit
      </button>
      <button
        type="button"
        className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
      >
        <CommonIcon label="copy" weight="thin" className="size-6.5" />
        Copy
      </button>
      {showTranslateButton && (
        <button
          type="button"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon label="translate" weight="thin" className="size-6.5" />
          Translate
        </button>
      )}
      <button
        type="button"
        className="cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger hover:bg-background-light-danger dark:hover:bg-background-dark-danger w-full flex justify-start gap-3 items-center rounded-2xl"
      >
        <CommonIcon label="trash" weight="thin" className="size-6.5" />
        Delete
      </button>
    </div>
  );
};
export const LanguageDropList = ({
  isActive = false,
  langCode,
  changeLangCode,
}: {
  isActive?: boolean;
  langCode: LanguageCode;
  changeLangCode: (langCode: LanguageCode) => void;
}): ReactNode => {
  return (
    <ul
      className={`absolute max-h-80 overflow-auto -top-3 min-w-80 w-full z-10 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-1.5 flex flex-col items-start stable-gutter-container scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      {LANGUAGES.map((language) => (
        <li
          key={language.code}
          className="cursor-pointer w-full flex justify-between items-center px-3 py-1 transition-all ease-in-out hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary rounded-3xl hover:pl-4"
          onClick={() => changeLangCode(language.code as LanguageCode)}
        >
          <div className="flex flex-col">
            <p className="text-base">{language.nativeName}</p>
            <p className="text-xs">{language.englishName}</p>
          </div>
          <div className="aspect-square h-6 rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex items-center justify-center">
            <div
              className={`transition-all ease-in-out aspect-square h-5 scale-0 bg-background-light-primary rounded-full ${langCode == language.code && "scale-100"}`}
            ></div>
          </div>
        </li>
      ))}
    </ul>
  );
};
export const BlockedUsersDropList = ({
  isActive = false,
  blockedUsersList,
}: {
  isActive?: boolean;
  blockedUsersList: User[];
}): ReactNode => {
  return (
    <div
      className={`absolute max-h-80 -top-4 w-full min-w-80 z-10  bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <div className="flex flex-col w-full">
        {blockedUsersList.map((user) => (
          <BlockedUserCard user={user} key={user._id} />
        ))}
      </div>
    </div>
  );
};

//
export const CopyContactButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyText = async () => {
    const copied = await copyToClipboard(text);
    setIsCopied(copied);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      type="button"
      onClick={copyText}
      className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
    >
      <CommonIcon
        label={isCopied ? "copy_check" : "copy"}
        weight="thin"
        className="size-6"
      />
      <Label text={isCopied ? "Copied" : "Copy"} />
    </button>
  );
};

export const ContactInfoDropList = ({
  isActive = false,
  authNUser,
}: {
  isActive?: boolean;
  authNUser: AuthNUser | null;
}): ReactNode => {
  return (
    <div
      className={`absolute max-h-80 -top-10 -auto w-full min-w-80 z-10  bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <div className="flex flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary w-full">
        {authNUser?.contactInfo.emails.map((email) => (
          <div
            key={email}
            className="text-sm relative py-2.5 pl-0 hover:pl-2 flex justify-between items-center gap-2 transition-all ease-in-out w-full p-0 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="envelope_alt"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />

              <p className="line-clamp-1 flex-1">{email}</p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <CopyContactButton text={email} />
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out"
              >
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.phoneNumbers.map((phoneNumber) => (
          <div
            key={phoneNumber}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative py-2.5 pl-0 hover:pl-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="phone"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />
              <p className="line-clamp-1 flex-1">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <CopyContactButton text={phoneNumber} />
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out"
              >
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.socialLinks.map((socialLink) => (
          <div
            key={socialLink.url}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative py-2.5 pl-0 hover:pl-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <SocialIcon
                platform={socialLink.type}
                className="size-6 flex-none opacity-60"
                weight="thin"
              />
              <p className="line-clamp-1 flex-1">{socialLink.url}</p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <CopyContactButton text={socialLink.url} />
              <button
                type="button"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out"
              >
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SettingsSearchDropList = ({
  suggList,
  isActive = false,
}: {
  suggList: {
    keywords: string[];
    label: string;
    path: string;
  }[];
  isActive?: boolean;
}) => {
  return (
    <div
      className={`absolute max-h-[85dvh] overflow-auto top-7/6 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3  self-end rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50 w-full`}
    >
      {suggList.map((sug) => (
        <Link
          to={sug.path}
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
          key={`${sug.label}-${sug.keywords.join("-")}-${sug.path}`}
        >
          {sug.label}
        </Link>
      ))}
    </div>
  );
};
