import { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth, useChat } from "../../hooks";
import ChatIcon from "../icons/ChatIcon";
import CommonIcon from "../icons/CommonIcon";
import { EMOJIS_LIST } from "../../config/emojis";
import EmojiIcon from "../icons/EmojiIcon";
import { PROVIDED_LANGUAGES } from "../../config/languages";
import type { LanguageCode, User } from "../../types";
import Label from "./Label";
import { useNavigate } from "react-router-dom";
import React from "react";
import { FlagIcon } from "../icons/FlagIcon";

export const ChatDropList = ({
  isActive = false,
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const { authNUser } = useAuth(),
    { currentChat } = useChat(),
    isArchived = authNUser?.archivedChats.includes(currentChat?._id as string);

  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <div
      ref={dropListRef}
      className={`absolute top-7/6 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit self-end rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
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
export const AttachmentCardDropList = ({
  isActive = false,
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <div
      ref={dropListRef}
      className={`absolute -bottom-2 z-50 right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit self-end rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon
          label="reply_stroke"
          weight="thin"
          className="size-6.5 -scale-x-100"
        />
        Forward
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
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);

  return (
    <div
      ref={dropListRef}
      className={`absolute bottom-7/6 left-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="image_plus" weight="thin" className="size-6.5" />
        Share Media
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="file_plus" weight="thin" className="size-6.5" />
        Share File
      </button>
    </div>
  );
};

export const ContactEntryDropList = ({
  contactEntry,
  isActive = false,
  setIsActive,
  isSmall = false,
}: {
  contactEntry: User | null;
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isSmall?: boolean;
}): ReactNode => {
  const { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(contactEntry?._id ?? "") ?? false,
    isMuted: boolean =
      authNUser?.mutedUsers.includes(contactEntry?._id ?? "") ?? false;

  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <div
      ref={dropListRef}
      className={`absolute z-10 ${isSmall ? "right-10 z-40 -top-10" : "top-0 -right-10"} bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
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
        className={`cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger ${isBlocked ? "hover:bg-green-400/10 dark:hover:bg-green-700/20 text-foreground-light-success dark:text-foreground-dark-success" : "hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
      >
        <CommonIcon
          label={isBlocked ? "user_check" : "user_x"}
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
  setIsActive,
}: {
  isActive?: boolean;
  userId: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(userId ?? "") ?? false,
    isMuted: boolean = authNUser?.mutedUsers.includes(userId ?? "") ?? false;

  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <div
      className={`absolute bottom-4 z-10 right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
      ref={dropListRef}
    >
      <button
        className={`cursor-pointer p-2 text-sm ${isBlocked ? "text-foreground-dark-success hover:bg-background-dark-success" : "text-foreground-dark-danger hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
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
  setIsActive,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);

  return (
    <div
      className={`absolute bottom-7/6 left-15 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-2xl p-1.5 grid grid-cols-4 scale-0 ${isActive && "scale-100"} transition-all ease-in-out`}
      ref={dropListRef}
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
  setIsActive,
}: {
  isActive?: boolean;
  isLeft?: boolean;
  showTranslateButton?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeEmojiDropList, setActiveEmojiDropList] =
    useState<boolean>(false);
  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
        setActiveEmojiDropList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <div
      className={`absolute z-20 -top-30 ${isLeft ? "left-0" : "right-0"} flex flex-col gap-2 items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out`}
      ref={dropListRef}
    >
      {/* Emojis */}
      <div className="flex flex-col">
        {
          <div
            className={`flex ${activeEmojiDropList ? "flex-col items-start" : "flex-row flex-none items-center w-full"} p-1.5 rounded-3xl bg-background-light-surface-3 dark:bg-background-dark-surface-3 shadow-lg dark:shadow-neutral-900/50`}
          >
            <div
              className={`${activeEmojiDropList ? "grid grid-cols-4" : "flex flex-none"} max-h-20 overflow-auto`}
            >
              {(activeEmojiDropList
                ? EMOJIS_LIST
                : EMOJIS_LIST.slice(0, 4)
              ).map((emoji) => (
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
            <button
              onClick={() => setActiveEmojiDropList((prev) => !prev)}
              className="relative group cursor-pointer p-1.5 flex-none aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 flex-none ${activeEmojiDropList ? "rotate-270 hover:-translate-y-1" : "rotate-90 hover:translate-y-1"} ease-in-out transition-all`}
              />
              <Label text={activeEmojiDropList ? "Less" : "More"} />
            </button>
          </div>
        }
      </div>
      {/* Options */}
      <div
        className={`relative bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${!activeEmojiDropList && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
      >
        <button
          type="button"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <ChatIcon label="reply_stroke" weight="thin" className="size-6.5" />
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
    </div>
  );
};

export const LanguageDropList = ({
  isActive = false,
  langCode,
  changeLangCode,
  setIsActive,
}: {
  isActive?: boolean;
  langCode: LanguageCode;
  changeLangCode: (langCode: LanguageCode) => void;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const dropListRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);
  return (
    <ul
      ref={dropListRef}
      className={`absolute max-h-80 overflow-auto top-full w-full z-10 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      {PROVIDED_LANGUAGES.map((language) => (
        <li
          key={language.code}
          className="cursor-pointer gap-3 w-full flex justify-start items-center p-2 transition-all ease-in-out hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary rounded-3xl"
          onClick={() => {
            changeLangCode(language.code as LanguageCode);
            setIsActive(false);
          }}
        >
          <FlagIcon
            langaugeCode={language.code as LanguageCode}
            className="h-6.5 rounded-3xl"
          />
          <div className="flex flex-col flex-1">
            <p className="text-sm">{language.nativeName}</p>
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

export const SettingsSearchDropList = ({
  suggList,
  isActive = false,
  setIsActive,
  setOpen,
}: {
  suggList: {
    keywords: string[];
    label: string;
    path: string;
  }[];
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className={`absolute max-h-[85dvh] overflow-auto top-7/6 left-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 self-end rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50 w-full`}
    >
      {suggList.map((sug) => (
        <div
          onClick={() => {
            scrollTo(0, 0);
            navigate(sug.path);
            setIsActive(false);
            setOpen(false);
          }}
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
          key={`${sug.label}-${sug.keywords.join("-")}-${sug.path}`}
        >
          {sug.label}
        </div>
      ))}
    </div>
  );
};

//
export const SideProfilePanelDropList = ({
  isActive,
  isContact,
  isBlocked,
  setIsActive,
}: {
  isActive: boolean;
  isContact: boolean;
  isBlocked: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dropListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);

  return (
    <div
      ref={dropListRef}
      className={`absolute bottom-full z-10 right-1/3 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      {isContact && (
        <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
          <CommonIcon label="edit" weight="thin" className="size-6.5" />
          Edit
        </button>
      )}
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon
          label={isContact ? "user_minus" : "user_plus"}
          weight="thin"
          className="size-6.5"
        />
        {isContact ? "Delete" : "Add"}
      </button>
      <button
        className={`cursor-pointer p-2 text-sm ${isBlocked ? "text-foreground-dark-success hover:bg-background-dark-success" : "text-foreground-dark-danger hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl transition-all ease-in-out`}
      >
        <CommonIcon
          label={isBlocked ? "user_check" : "user_x"}
          weight="thin"
          className="size-6.5"
        />
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
};

export const ProfileDropList = ({
  isActive,
  user,
  setIsActive,
}: {
  isActive: boolean;
  user: User | null;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const dropListRef = useRef<HTMLDivElement | null>(null);
  const { authNUser } = useAuth(),
    { contacts } = useChat();
  const isBlocked: boolean =
      authNUser?.blockedUsers.includes(user?._id ?? "") ?? false,
    isContact: boolean = (user?._id ?? "") in contacts,
    isMuted: boolean = authNUser?.mutedUsers.includes(user?._id ?? "") ?? false;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropListRef.current &&
        !dropListRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropListRef, setIsActive]);

  return (
    <div
      ref={dropListRef}
      className={`absolute w-full top-full z-20 right-1/3 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      {!isBlocked && (
        <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
          <CommonIcon label="phone" weight="thin" className="size-6.5" />
          Call
        </button>
      )}
      {isContact && (
        <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
          <CommonIcon label="edit" weight="thin" className="size-6.5" />
          Edit
        </button>
      )}
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <CommonIcon
          label={isContact ? "user_minus" : "user_plus"}
          weight="thin"
          className="size-6.5"
        />
        {isContact ? "Delete" : "Add"}
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
        className={`cursor-pointer p-2 text-sm ${isBlocked ? "text-foreground-dark-success hover:bg-background-dark-success" : "text-foreground-dark-danger hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl transition-all ease-in-out`}
      >
        <CommonIcon
          label={isBlocked ? "user_check" : "user_x"}
          weight="thin"
          className="size-6.5"
        />
        {isBlocked ? "Unblock" : "Block"}
      </button>
    </div>
  );
};
