import { lazy, useEffect, useRef, useState, type ReactNode } from "react";
import { useChat } from "../../hooks";
import type { Gender, SocialLink, ThemeMode, User } from "../../types";
import moment from "moment";
import CommonIcon from "../icons/CommonIcon";
import Label from "./Label";
import { Link, useLocation } from "react-router-dom";
import SocialIcon, { EmailIcon } from "../icons/SocialIcon";
import { formatPhoneNumber, formatText } from "../../utils/format";
import { Avatar } from "../icons/Avatar";
import { calculateAge, copyToClipboard } from "../../utils/helpers";

const BlockedCardDropList = lazy(() =>
  import("./DropList").then((module) => ({
    default: module.BlockedCardDropList,
  })),
);

export const BlockedUserCard = ({ user }: { user: User }) => {
  const { contacts } = useChat();
  const [isActiveCardDropList, setIsActiveCardDropList] =
    useState<boolean>(false);
  const toggleCardDropList = () => setIsActiveCardDropList((prev) => !prev);

  return (
    <div className="relative p-2 group/card flex justify-between items-center gap-2 transition-all ease-in-out w-full rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <BlockedCardDropList
        isActive={isActiveCardDropList}
        userId={user._id}
        setIsActive={setIsActiveCardDropList}
      />

      <Link
        to={`/app/profile/${user.username}`}
        className="flex gap-2 flex-1 items-center"
      >
        <div
          className={`relative flex-none transition-all ease-in-out rounded-full flex items-center justify-center aspect-square `}
        >
          {user?.isActive && (
            <span
              className={`absolute flex items-center size-3 justify-center rounded-full bottom-0 right-0 bg-background-light-base dark:bg-background-dark-base group-hover/card:bg-background-light-surface-2 group-hover/card:dark:bg-background-dark-surface-2`}
            >
              <span className="bg-foreground-dark-success size-[0.55rem] aspect-square rounded-full"></span>
            </span>
          )}
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              alt={user?.firstName}
              className="size-10 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="size-10 rounded-full flex-none overflow-hidden">
              <Avatar
                gender={user?.gender as Gender}
                age={calculateAge(user?.birthdate as string)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <div className="flex gap-1 justify-between items-center">
            <p className="line-clamp-1 text-sm font-semibold flex-1">
              {contacts[user?._id ?? ""]
                ? `${contacts[user?._id ?? ""]?.firstName} ${contacts[user?._id ?? ""]?.lastName}`
                : `${user?.firstName} ${user?.lastName}`}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
              {user?.isActive
                ? "Active Now"
                : `Active ${moment(
                    new Date(user?.lastSeen as string),
                  ).fromNow()}`}
            </p>
          </div>
        </div>
      </Link>

      <button
        className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        onClick={toggleCardDropList}
      >
        <CommonIcon
          label="dots_vertical_rounded"
          className="size-6"
          soild={true}
        />
        <Label text="More" />
      </button>
    </div>
  );
};

export const ContactSocialCard = ({
  socialLink,
  theme = "light",
}: {
  socialLink: SocialLink;
  theme?: ThemeMode;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => setIsActive((prev) => !prev);
  const isSettings = useLocation().pathname.includes("settings");
  return (
    <div className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative p-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <ContactInfoCardDropList
        isActive={isActive}
        setIsActive={setIsActive}
        isSettings={isSettings}
        isSocial={true}
        textToCopy={socialLink.url}
      />

      <div className="flex gap-3 items-center">
        {socialLink.favicon ? (
          <img src={socialLink.favicon} className="w-6 flex-none" />
        ) : (
          <SocialIcon
            platform={socialLink.type}
            className="size-6 flex-none"
            weight="thin"
            theme={theme}
          />
        )}
        <div className="flex-1">
          <p className="text-xs opacity-80">
            {socialLink.type == "website"
              ? socialLink.custom_name
              : formatText(socialLink.type)}
          </p>
          <p className="line-clamp-1">{socialLink.url}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleActive}
        className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
      >
        <CommonIcon
          label="dots_vertical_rounded"
          weight="thin"
          soild={true}
          className="size-6"
        />
        <Label text="More" />
      </button>
    </div>
  );
};

export const ContactPhoneNumberCard = ({
  phoneNumber,
}: {
  phoneNumber: string;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const isSettings = useLocation().pathname.includes("settings");
  const toggleActive = () => setIsActive((prev) => !prev);
  return (
    <div className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative p-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <ContactInfoCardDropList
        isActive={isActive}
        setIsActive={setIsActive}
        isSettings={isSettings}
        isPhone={true}
        textToCopy={phoneNumber}
      />
      <div className="flex flex-1 gap-3 items-center">
        <CommonIcon label="phone" weight="thin" className="size-6 flex-none" />
        <div className="flex-1">
          <p className="text-xs opacity-80">Phone Number</p>
          <p className="line-clamp-1">{formatPhoneNumber(phoneNumber)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={toggleActive}
        className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
      >
        <CommonIcon
          label="dots_vertical_rounded"
          weight="thin"
          soild={true}
          className="size-6"
        />
        <Label text="More" />
      </button>
    </div>
  );
};

export const ContactEmailCard = ({ email }: { email: string }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => setIsActive((prev) => !prev);
  const isSettings = useLocation().pathname.includes("settings");
  return (
    <div className="text-sm relative p-2 flex justify-between items-center gap-2 transition-all ease-in-out w-full rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <ContactInfoCardDropList
        isActive={isActive}
        setIsActive={setIsActive}
        isSettings={isSettings}
        isEmail={true}
        textToCopy={email}
      />
      <div className="flex gap-3 items-center flex-1">
        <EmailIcon email={email} className="size-6" />
        <div className="flex-1">
          <p className="text-xs opacity-80">Email</p>
          <p className="line-clamp-1">{email}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={toggleActive}
        className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
      >
        <CommonIcon
          label="dots_vertical_rounded"
          weight="thin"
          soild={true}
          className="size-6"
        />
        <Label text="More" />
      </button>
    </div>
  );
};

// Contact cards droplist
// |---> profile (copy and [send email|call|view link])
// |---> settings (edit, copy and delete)

export const ContactInfoCardDropList = ({
  isActive = false,
  setIsActive,
  isSettings = false,
  isPhone = false,
  isEmail = false,
  isSocial = false,
  textToCopy,
}: {
  isActive?: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isSettings?: boolean;
  isPhone?: boolean;
  isEmail?: boolean;
  isSocial?: boolean;
  textToCopy: string;
}): ReactNode => {
  const dropListRef = useRef<HTMLDivElement | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);

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
      className={`absolute bottom-5/6 z-50 right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-1.5 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
      ref={dropListRef}
    >
      {isSettings && (
        <button
          type="button"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon label="edit" weight="thin" className="size-6.5" />
          Edit
        </button>
      )}
      <button
        type="button"
        className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        onClick={async () => {
          const copied = await copyToClipboard(textToCopy);
          setIsCopied(copied);

          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
      >
        <CommonIcon
          label={isCopied ? "copy_check" : "copy"}
          weight="thin"
          className="size-6.5"
        />
        {isCopied ? "Copied" : "Copy"}
      </button>
      {!isSettings && isPhone && (
        <a
          href={`tel:${textToCopy}`}
          target="_blank"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon label="phone" weight="thin" className="size-6.5" />
          Call
        </a>
      )}
      {!isSettings && isEmail && (
        <a
          href={`mailto:${textToCopy}`}
          target="_blank"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon label="paper_plane" weight="thin" className="size-6.5" />
          Send
        </a>
      )}
      {!isSettings && isSocial && (
        <a
          href={textToCopy}
          target="_blank"
          className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon
            label="arrow_out_up_right_stroke_square"
            weight="thin"
            className="size-6.5"
          />
          Visit
        </a>
      )}
      {isSettings && (
        <button
          type="button"
          className="cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger hover:bg-background-light-danger dark:hover:bg-background-dark-danger w-full flex justify-start gap-3 items-center rounded-2xl"
        >
          <CommonIcon label="trash" weight="thin" className="size-6.5" />
          Delete
        </button>
      )}
    </div>
  );
};
