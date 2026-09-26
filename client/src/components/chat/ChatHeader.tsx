import { useState, type ReactNode } from "react";
import { useAuth, useChat } from "../../hooks";
import moment from "moment";
import { ChatDropList } from "../common/DropList";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";
import { Avatar } from "../icons/Avatar";
import { calculateAge } from "../../utils/helpers";
import type { Gender } from "../../types";

const ChatHeader = ({
  toggleButtonClickAction = () => {},
}: {
  toggleButtonClickAction?: () => void;
}): ReactNode => {
  const { currentParticipant, contacts, currentChat } = useChat(),
    { authNUser } = useAuth(),
    [isChatDropListActive, setIsChatDropListActive] = useState<boolean>(false);

  const toggleChatDropList = () => setIsChatDropListActive((prev) => !prev);
  const isBlocked =
    authNUser?.blockedUsers.includes(currentParticipant?._id ?? "") ?? false;
  return (
    <header className="sticky top-0 w-full flex flex-col gap-3 z-20 max-w-200">
      <div className="relative">
        <div className="bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 rounded-full w-full flex items-center justify-between">
          <div
            className="flex gap-4 items-center flex-1 cursor-pointer"
            onClick={toggleButtonClickAction}
          >
            <Link
              to={`/app/profile/${currentParticipant?.username}`}
              className="relative flex-none"
            >
              {currentParticipant?.isActive && (
                <span className="absolute flex items-center w-4 h-4 bg-background-light-surface-3 dark:bg-background-dark-surface-3 justify-center rounded-full -bottom-0.5 -right-0.5">
                  <span className="bg-foreground-dark-success size-[0.605rem] aspect-square rounded-full"></span>
                </span>
              )}
              {currentParticipant?.profileImage ? (
                <img
                  src={currentParticipant?.profileImage}
                  alt={currentParticipant?.firstName}
                  loading="lazy"
                  className="size-11 rounded-full flex-none"
                />
              ) : (
                <div className="size-11 rounded-full flex-none overflow-hidden">
                  <Avatar
                    gender={currentParticipant?.gender as Gender}
                    age={calculateAge(currentParticipant?.birthdate as string)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Link>
            <div className="flex flex-col">
              <p className="font-semibold text-base text-foreground-light-secondary dark:text-foreground-dark-secondary leading-5 line-clamp-1">
                {contacts[currentParticipant?._id ?? ""]
                  ? `${contacts[currentParticipant?._id ?? ""].firstName} ${contacts[currentParticipant?._id ?? ""].lastName}`
                  : `${currentParticipant?.firstName} ${currentParticipant?.lastName}`}
              </p>

              <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
                {currentParticipant?.isActive
                  ? "Active Now"
                  : `Active ${moment(
                      new Date(currentParticipant?.lastSeen as string),
                    ).fromNow()}`}
              </p>
            </div>
          </div>
          <div className="flex-none">
            {!isBlocked && (
              <button className="cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon label="phone" weight="thin" className="size-6.5" />
              </button>
            )}
            {currentChat && (
              <button
                className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isChatDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary"}`}
                onClick={toggleChatDropList}
              >
                <CommonIcon
                  label="dots_vertical_rounded"
                  className="size-6.5"
                  soild={true}
                />
              </button>
            )}
          </div>
        </div>
        <ChatDropList
          isActive={isChatDropListActive}
          setIsActive={setIsChatDropListActive}
        />
      </div>
    </header>
  );
};

export default ChatHeader;
