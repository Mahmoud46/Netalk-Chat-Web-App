import { useState, type ReactNode } from "react";
import { useChat } from "../../hooks";
import moment from "moment";
import { ChatDropList } from "../common/DropList";
import CommonIcon from "../icons/common/CommonIcon";

const ChatHeader = (): ReactNode => {
  const { currentParticipant, contacts } = useChat(),
    [isChatDropListActive, setIsChatDropListActive] = useState<boolean>(false);

  const toggleChatDropList = () => setIsChatDropListActive((prev) => !prev);
  return (
    <header className="sticky top-0 w-full flex flex-col gap-3 z-1">
      <div className="relative">
        <div className="bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-3 rounded-full w-full flex items-center justify-between">
          <div className="flex gap-4 items-center">
            <div className="relative flex-none">
              {currentParticipant?.isActive && (
                <span className="absolute flex items-center w-3.5 h-3.5 bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-0 right-0">
                  <span className="bg-background-dark-success w-2 h-2 aspect-square rounded-full"></span>
                </span>
              )}
              <img
                src={currentParticipant?.profileImage}
                alt={currentParticipant?.firstName}
                loading="lazy"
                className="size-10.5 rounded-full flex-none"
              />
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary leading-5 line-clamp-1">
                {contacts[currentParticipant?._id ?? ""] ??
                  `${currentParticipant?.firstName} ${currentParticipant?.lastName}`}
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
            <button className="cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="phone" weight="thin" className="size-6.5" />
            </button>
            <button
              className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isChatDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary hover:scale-110"}`}
              onClick={toggleChatDropList}
            >
              <CommonIcon
                label="dots_vertical_rounded"
                className="size-6.5"
                soild={true}
              />
            </button>
          </div>
        </div>
        <ChatDropList isActive={isChatDropListActive} />
      </div>
    </header>
  );
};

export default ChatHeader;
