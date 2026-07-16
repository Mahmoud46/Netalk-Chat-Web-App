import type { ReactNode } from "react";
import type { User } from "../../types";
import { useChat } from "../../hooks";
import moment from "moment";
import Label from "../common/Label";
import React, { useState } from "react";
import CommonIcon from "../icons/common/CommonIcon";

const ContactEntryDropList = React.lazy(() =>
  import("../common/DropList").then((module) => ({
    default: module.ContactEntryDropList,
  })),
);

export const ContactCard = ({
  contactEntry,
}: {
  contactEntry: User;
}): ReactNode => {
  const { contacts, currentContactEntry, setCurrentContactEntry } = useChat();
  const [isActiveContactEntryDropList, setIsActiveContactEntryDropList] =
    useState<boolean>(false);
  const isActive: boolean =
    (currentContactEntry && currentContactEntry?._id == contactEntry._id) ??
    false;

  const activateContactEntry = () => setCurrentContactEntry(contactEntry),
    toggleContactEntryDropList = () =>
      setIsActiveContactEntryDropList((prev) => !prev);

  return (
    <div
      className={`w-50 relative flex flex-col items-center ${isActive ? "justify-center" : "justify-start"} aspect-4/5`}
    >
      <ContactEntryDropList isActive={isActiveContactEntryDropList} />
      <div
        className={`p-4 ${isActive ? "h-35 translate-y-6" : "h-[calc(100%-30px)]"} rounded-3xl text-center bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex flex-col items-center justify-center cursor-pointer transition-all ease-in-out`}
        onClick={activateContactEntry}
      >
        <p
          className={`line-clamp-1 ${isActive ? "translate-y-0" : "translate-y-6"} font-semibold text-base text-black dark:text-background-light-surface-3`}
        >
          {contacts[contactEntry._id]}
        </p>
        <p
          className={`text-xs ${isActive ? "translate-y-0" : "translate-y-6"} text-foreground-light-third dark:text-foreground-dark-secondary`}
        >
          {contactEntry.isActive
            ? "Active Now"
            : `Active ${moment(new Date(contactEntry.lastSeen)).fromNow()}`}
        </p>
      </div>
      <div
        className={`absolute ${isActive ? "top-5 p-3 contacts-card-profile-image-active-corners [--shadow-color:#ffffff] dark:[--shadow-color:#0f1115]" : "top-4 p-1.5"} bg-background-light-base dark:bg-background-dark-base rounded-full cursor-pointer transition-all ease-in-out`}
        onClick={activateContactEntry}
      >
        <img
          src={contactEntry.profileImage}
          alt={contactEntry.firstName}
          loading="lazy"
          className="rounded-full size-18"
        />
        {contactEntry.isActive && (
          <span
            className={`absolute flex items-center size-4.5 aspect-square bg-background-light-base dark:bg-background-dark-base justify-center rounded-full ${isActive ? "bottom-3 right-3" : "bottom-1.5 right-1.5"}`}
          >
            <span className="bg-background-dark-success size-3 aspect-square rounded-full"></span>
          </span>
        )}
      </div>

      <div className="absolute p-3 bottom-0 rounded-full flex items-center contacts-card-corners [--shadow-color:#ffffff] dark:[--shadow-color:#0f1115] bg-background-light-base dark:bg-background-dark-base">
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="paper_plane" className="size-6" weight="thin" />
          <Label text="Chat" />
        </button>
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
  );
};

export const ContactsOnlineCard = ({
  contactEntry,
}: {
  contactEntry: User;
}): ReactNode => {
  const { setCurrentContactEntry } = useChat();

  const activateContactEntry = () => setCurrentContactEntry(contactEntry);
  return (
    <div
      className="flex-none gradient p-1 rounded-full cursor-pointer relative group"
      onClick={activateContactEntry}
    >
      <div className="bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1 rounded-full relative">
        <img
          src={contactEntry.profileImage}
          alt={contactEntry.firstName}
          className="size-10 rounded-full"
          loading="lazy"
        />
        <span className="absolute flex items-center size-3.5 aspect-square bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-0 right-0">
          <span className="bg-background-dark-success size-2 aspect-square rounded-full"></span>
        </span>
      </div>
      <Label text={contactEntry.firstName} />
    </div>
  );
};
