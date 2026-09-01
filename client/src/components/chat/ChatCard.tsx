import { useEffect, useState, type ReactNode } from "react";
import type { Chat, User } from "../../types";
import { useAuth, useChat } from "../../hooks";
import Label from "../common/Label";
import { MessageStatusIcon } from "../icons/ChatIcon";
import { formatDate, formatTime12Hours } from "../../utils/format";

const ChatCard = ({
  chat,
  isSidebarOpen,
}: {
  chat: Chat;
  isSidebarOpen: boolean;
}): ReactNode => {
  const [participant, setParticipant] = useState<User | null>(null),
    { getUser, currentChat, setCurrentChat, setCurrentParticipant } = useChat(),
    { authNUser } = useAuth();

  const isActive = chat._id === currentChat?._id;

  const selectChat = () => {
    setCurrentChat(chat);
    setCurrentParticipant(participant);
  };

  useEffect(() => {
    const fetchParticipant = async () => {
      const user = await getUser(chat.participants[1]);

      if (user) {
        setParticipant(user);
      }
    };

    fetchParticipant();
  }, [chat._id]);

  return (
    <li
      className={`relative flex group cursor-pointer transition-all ease-in-out rounded-full p-2 ${
        isSidebarOpen
          ? `gap-2 max-w-67 items-start hover:bg-background-light-base hover:dark:bg-background-dark-base pr-3 ${
              isActive
                ? "bg-background-light-base dark:bg-background-dark-base"
                : "bg-transparent"
            }`
          : `gap-0 ${
              isActive
                ? "bg-background-light-base dark:bg-background-dark-base translate-x-9 chat-card-shrink-active [--shadow-color:#fff] dark:[--shadow-color:#0f1115]"
                : "bg-transparent"
            }`
      }`}
      onClick={selectChat}
    >
      <div
        className={`relative flex-none transition-all ease-in-out rounded-full p-1 flex items-center justify-center aspect-square ${chat.unreadMessages > 0 && !isActive && !isSidebarOpen ? "bg-background-light-primary" : "bg-background-light-base dark:bg-background-dark-base"} ${isActive && "bg-background-light-surface-2 dark:bg-background-dark-surface-2"} ${isSidebarOpen ? "" : "group-hover:scale-110"}`}
      >
        {chat.unreadMessages > 0 && !isActive && !isSidebarOpen && (
          <span className="text-white absolute text-[11px] bg-background-light-primary w-4 h-4 aspect-square flex items-center justify-center rounded-full -top-0.5 -right-0.5">
            {chat.unreadMessages > 9 ? `+${9}` : chat.unreadMessages}
          </span>
        )}

        {chat.unreadMessages === 0 &&
          chat.lastMessage.sender == authNUser?._id &&
          !isSidebarOpen && (
            <span className="absolute bg-background-light-base dark:bg-background-dark-base w-4 h-4 aspect-square flex items-center justify-center rounded-full -top-0.5 -right-0.5">
              <MessageStatusIcon
                weight={chat.lastMessage.status == "sent" ? "base" : "thin"}
                status={chat.lastMessage.status}
                className={`${chat.lastMessage.status === "sent" && "size-2.5"}`}
              />
            </span>
          )}

        {participant?.isActive && (
          <span className="absolute flex items-center w-3.5 h-3.5 bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-0 right-0">
            <span className="bg-background-dark-success w-2 h-2 aspect-square rounded-full"></span>
          </span>
        )}

        <img
          src={participant?.profileImage}
          alt={participant?.firstName}
          className="size-9 rounded-full object-cover"
          loading="lazy"
        />
      </div>
      {isSidebarOpen && (
        <div className="flex flex-1 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <div className="flex gap-1 justify-between items-center">
            <p className="line-clamp-1 text-sm font-semibold flex-1">
              {participant?.firstName} {participant?.lastName}
            </p>
            <time
              dateTime={chat.lastMessage?.createdAt}
              className={`${chat.unreadMessages > 0 && !isActive ? "text-foreground-light-primary" : "text-foreground-light-secondary dark:text-foreground-dark-secondary"} text-xs self-end`}
            >
              {formatDate(new Date(chat.lastMessage?.createdAt)) ==
              formatDate(new Date())
                ? formatTime12Hours(new Date(chat.lastMessage?.createdAt))
                : formatDate(new Date(chat.lastMessage?.createdAt))}
            </time>
          </div>
          <div className="flex items-center">
            {
              <p className="line-clamp-1 text-xs flex-1">
                {chat.lastMessage.text}
              </p>
            }
            {chat.unreadMessages > 0 && !isActive && isSidebarOpen && (
              <span className="text-white text-xs flex-none p-0.5 w-5 bg-background-light-primary aspect-square flex items-center justify-center rounded-full">
                {chat.unreadMessages > 9 ? `+${9}` : chat.unreadMessages}
              </span>
            )}
            {chat.unreadMessages === 0 &&
              chat.lastMessage.sender == authNUser?._id &&
              isSidebarOpen && (
                <span className="flex items-center justify-center rounded-full size-6">
                  <MessageStatusIcon
                    weight={chat.lastMessage.status == "sent" ? "base" : "thin"}
                    status={chat.lastMessage.status}
                    className={`${chat.lastMessage.status === "sent" && "size-3"}`}
                  />
                </span>
              )}
          </div>
        </div>
      )}
      {!isSidebarOpen && (
        <Label text={participant?.firstName ?? ""} isSide={true} />
      )}
    </li>
  );
};

export default ChatCard;
