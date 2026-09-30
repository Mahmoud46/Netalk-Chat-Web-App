import { lazy, useState } from "react";
import { useChat } from "../../hooks";
import type { SocialLink, ThemeMode, User } from "../../types";
import moment from "moment";
import CommonIcon from "../icons/CommonIcon";
import Label from "./Label";
import { Link } from "react-router-dom";
import SocialIcon, { EmailIcon } from "../icons/SocialIcon";
import { formatPhoneNumber } from "../../utils/format";

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
    <div className="relative flex p-2 rounded-full justify-between items-center transition-all ease-in-out cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <BlockedCardDropList isActive={isActiveCardDropList} userId={user._id} />

      <Link to={`/app/profile/${user.username}`} className="flex gap-4 flex-1">
        <div className="relative flex-none">
          {user?.isActive && (
            <span className="absolute flex items-center w-3.5 h-3.5 bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-0 right-0">
              <span className="bg-background-dark-success w-2 h-2 aspect-square rounded-full"></span>
            </span>
          )}
          <img
            src={user.profileImage ?? ""}
            alt={user.firstName}
            loading="lazy"
            className="size-9 rounded-full"
          />
        </div>
        <div className="">
          <p className="font-semibold text-base text-foreground-light-secondary dark:text-white leading-5 line-clamp-1">
            {contacts[user?._id ?? ""]
              ? `${contacts[user?._id ?? ""].firstName} ${contacts[user?._id ?? ""].lastName}`
              : `${user?.firstName} ${user?.lastName}`}
          </p>

          <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
            {user?.isActive
              ? "Active Now"
              : `Active ${moment(
                  new Date(user?.lastSeen as string),
                ).fromNow()}`}
          </p>
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
  return (
    <div className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative p-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
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
              : socialLink.type}
          </p>
          <p className="line-clamp-1">{socialLink.url}</p>
        </div>
      </div>
      <button className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
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
  return (
    <div className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative p-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <div className="flex flex-1 gap-3 items-center">
        <CommonIcon label="phone" weight="thin" className="size-6 flex-none" />
        <div className="flex-1">
          <p className="text-xs opacity-80">Phone Number</p>
          <p className="line-clamp-1">{formatPhoneNumber(phoneNumber)}</p>
        </div>
      </div>
      <button className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
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
  return (
    <div className="text-sm relative p-2 flex justify-between items-center gap-2 transition-all ease-in-out w-full rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <div className="flex gap-3 items-center flex-1">
        <EmailIcon email={email} className="size-6" />
        <div className="flex-1">
          <p className="text-xs opacity-80">Email</p>
          <p className="line-clamp-1">{email}</p>
        </div>
      </div>

      <button className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
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
