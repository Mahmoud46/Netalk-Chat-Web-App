import { lazy, useState } from "react";
import { useChat } from "../../hooks";
import type { User } from "../../types";
import moment from "moment";
import CommonIcon from "../icons/CommonIcon";
import Label from "./Label";

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

      <div className="flex gap-4 flex-1">
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
            {contacts[user?._id ?? ""] ??
              `${user?.firstName} ${user?.lastName}`}
          </p>

          <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
            {user?.isActive
              ? "Active Now"
              : `Active ${moment(
                  new Date(user?.lastSeen as string),
                ).fromNow()}`}
          </p>
        </div>
      </div>

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
