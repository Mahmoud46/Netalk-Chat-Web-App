import type { ReactNode } from "react";
import type { User } from "../../types";
import { useChat, useTheme } from "../../hooks";
import moment from "moment";
import Label from "../common/Label";
import React, { useState } from "react";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";
import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";

const ContactEntryDropList = React.lazy(() =>
  import("../common/DropList").then((module) => ({
    default: module.ContactEntryDropList,
  })),
);

export const ContactCard = ({ contactEntry }: { contactEntry: User }) => {
  const { contacts } = useChat();
  const [isActiveContactEntryDropList, setIsActiveContactEntryDropList] =
    useState<boolean>(false);
  const { theme } = useTheme();

  const toggleContactEntryDropList = () =>
    setIsActiveContactEntryDropList((prev) => !prev);

  return (
    <div className="w-50 aspect-4/5 relative">
      <div className="w-full flex flex-col items-center bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl">
        <ContactEntryDropList isActive={isActiveContactEntryDropList} />
        <Link
          to={`/app/profile/${contactEntry.username}`}
          className="relative h-20 w-full cursor-pointer"
        >
          <img
            src={
              contactEntry?.profileCover ??
              (theme == "dark" ? default_cover_dark : default_cover)
            }
            alt="participant-profile-cover"
            loading="lazy"
            className="w-full rounded-3xl object-cover h-full"
          />

          <div
            className={`absolute -bottom-11 left-1/2 -translate-x-1/2 p-1.5 rounded-full transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2`}
          >
            <img
              src={contactEntry.profileImage}
              alt={contactEntry.firstName}
              loading="lazy"
              className="rounded-full size-18"
            />
            {contactEntry.isActive && (
              <span
                className={`absolute flex items-center p-1 aspect-square bg-background-light-surface-2 dark:bg-background-dark-surface-2 justify-center rounded-full bottom-1 right-1`}
              >
                <span className="bg-foreground-dark-success size-[0.99rem] aspect-square rounded-full"></span>
              </span>
            )}
          </div>
        </Link>
        <Link
          to={`/app/profile/${contactEntry.username}`}
          className="px-4 flex flex-col text-center mt-11 cursor-pointer"
        >
          <p
            className={`line-clamp-1 font-semibold text-base text-black dark:text-background-light-surface-3`}
          >
            {contacts[contactEntry._id].firstName}{" "}
            {contacts[contactEntry._id].lastName}
          </p>
          <p
            className={`text-xs text-foreground-light-third dark:text-foreground-dark-secondary`}
          >
            {contactEntry.isActive
              ? "Active Now"
              : `Active ${moment(new Date(contactEntry.lastSeen)).fromNow()}`}
          </p>
        </Link>
        <div className="p-2 translate-y-7 rounded-full flex items-center contacts-card-corners [--shadow-color:#ffffff] dark:[--shadow-color:#0f1115] bg-background-light-base dark:bg-background-dark-base">
          <Link
            to={`/app/inbox/${contactEntry._id}`}
            className="relative group mr-2 cursor-pointer p-2 rounded-full gradient transition-all ease-in-out"
          >
            <CommonIcon
              label="paper_plane"
              className="size-6 transition-all ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
              weight="thin"
              soild={true}
            />
            <Label text="Chat" />
          </Link>
          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="phone" className="size-6" weight="thin" />
            <Label text="Call" />
          </button>
          <button
            className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            onClick={toggleContactEntryDropList}
          >
            <CommonIcon
              label="dots_vertical_rounded"
              className="size-6"
              soild={true}
            />
            <Label text="More" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContactsOnlineCard = ({
  contactEntry,
}: {
  contactEntry: User;
}): ReactNode => {
  return (
    <Link
      className="flex-none cursor-pointer relative group"
      to={`/app/profile/${contactEntry.username}`}
    >
      {contactEntry?.isActive && (
        <span className="absolute flex items-center size-4 bg-background-light-surface-3 dark:bg-background-dark-surface-3 justify-center rounded-full -bottom-0.5 -right-0.5">
          <span className="bg-foreground-dark-success size-[0.5775rem] aspect-square rounded-full"></span>
        </span>
      )}
      <img
        src={contactEntry?.profileImage}
        alt={contactEntry?.firstName}
        loading="lazy"
        className="size-10.5 rounded-full flex-none"
      />
      <Label text={contactEntry.firstName} />
    </Link>
  );
};
