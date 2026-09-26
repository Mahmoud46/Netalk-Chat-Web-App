import { useEffect, useState, type ReactNode } from "react";
import type { Chat, Gender, User } from "../../types";
import { useAuth, useChat } from "../../hooks";
import Label from "../common/Label";
import ChatIcon, { MessageStatusIcon } from "../icons/ChatIcon";
import { formatDate, formatTime12Hours } from "../../utils/format";
import { useNavigate } from "react-router-dom";
import { Avatar } from "../icons/Avatar";
import { calculateAge } from "../../utils/helpers";

export const ArchiveChatsCard = ({
  isSidebarOpen,
  toggleArchiveTab,
  activeArchiveTab,
}: {
  isSidebarOpen: boolean;
  toggleArchiveTab: () => void;
  activeArchiveTab: boolean;
}) => {
  const { authNUser } = useAuth();
  const { chats } = useChat();
  const [chat, setChat] = useState<Chat | null>(null),
    [unreadMessages, setUnreadMessages] = useState<number>(0);

  useEffect(() => {
    const getLastArchivedChat = async () => {
      if (authNUser?.archivedChats.length && !activeArchiveTab) {
        const archivedChats = chats.filter((chat) =>
          authNUser?.archivedChats.includes(chat._id),
        );
        const archivedChat =
          archivedChats.find((chat) => chat.unreadMessages > 0) ??
          archivedChats[0];
        const unreadArchivedChatsMessages = archivedChats.reduce(
          (prev, curr) => {
            return prev + curr.unreadMessages;
          },
          0,
        );

        if (archivedChat) setChat(archivedChat);
        setUnreadMessages(unreadArchivedChatsMessages);
      } else {
        const unarchivedChats = chats.filter(
          (chat) => !authNUser?.archivedChats.includes(chat._id),
        );

        if (unarchivedChats.length > 0) {
          const unreadUnrchivedChatsMessages = unarchivedChats.reduce(
            (prev, curr) => prev + curr.unreadMessages,
            0,
          );

          const unarchivedChat =
            unarchivedChats.find((chat) => chat.unreadMessages > 0) ??
            unarchivedChats[0];
          setChat(unarchivedChat);
          setUnreadMessages(unreadUnrchivedChatsMessages);
        }
      }
    };
    getLastArchivedChat();
  }, [authNUser?.archivedChats, chats, activeArchiveTab]);

  return (
    chat && (
      <li
        className={`relative flex group cursor-pointer transition-all ease-in-out p-2 ${
          isSidebarOpen
            ? `gap-2 max-w-67 items-center p-1 pr-3 rounded-3xl bg-transparent hover:bg-background-light-base/50 hover:dark:bg-background-dark-base/50`
            : `gap-0 rounded-full bg-transparent`
        }`}
        onClick={toggleArchiveTab}
      >
        <div
          className={`relative flex-none transition-all ease-in-out rounded-full p-2 flex items-center justify-center aspect-square bg-[#e11d48] dark:bg-[#7f1d1d] ${!isSidebarOpen && "hover:scale-110"}`}
        >
          {unreadMessages > 0 && !isSidebarOpen && (
            <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-0 -right-2 z-10">
              {unreadMessages > 99 ? `+${99}` : unreadMessages}
            </span>
          )}

          {unreadMessages === 0 &&
            chat.lastMessage.sender == authNUser?._id &&
            !isSidebarOpen && (
              <span className="absolute bg-background-light-base dark:bg-background-dark-base flex items-center justify-center rounded-full top-0 -right-2 w-6 h-5 shadow-xl/30 overflow-hidden">
                <MessageStatusIcon
                  weight={chat.lastMessage.status == "sent" ? "base" : "thin"}
                  status={chat.lastMessage.status}
                  className={`${chat.lastMessage.status === "sent" ? "size-3" : "size-6"}`}
                />
              </span>
            )}

          <ChatIcon
            label={activeArchiveTab ? "archive_arrow_up" : "archive_arrow_down"}
            className="size-7"
            weight="thin"
            solid={true}
          />
        </div>
        {isSidebarOpen && (
          <div className="flex flex-1 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <div className="flex gap-1 justify-between items-center">
              <p className="line-clamp-1 text-sm font-semibold flex-1">
                {activeArchiveTab ? "Unarchived Chats" : "Archived Chats"}
              </p>
            </div>
            <div className="flex items-center">
              {
                <p className="line-clamp-1 text-xs flex-1">
                  {chat.lastMessage.text}
                </p>
              }
              {unreadMessages > 0 && isSidebarOpen && (
                <span className="text-white text-xs bg-background-light-primary w-7 py-0.5 flex items-center justify-center rounded-full">
                  {unreadMessages > 99 ? `+${99}` : unreadMessages}
                </span>
              )}
            </div>
          </div>
        )}
        {!isSidebarOpen && (
          <Label
            text={activeArchiveTab ? "Unarchived Chats" : "Archived Chats"}
            isSide={true}
          />
        )}
      </li>
    )
  );
};

const ChatCard = ({
  chat,
  isSidebarOpen,
}: {
  chat: Chat;
  isSidebarOpen: boolean;
}): ReactNode => {
  const [participant, setParticipant] = useState<User | null>(null),
    { getUser, currentChat, contacts } = useChat(),
    { authNUser } = useAuth();
  const navigate = useNavigate();

  const isActive = chat._id === currentChat?._id;

  const selectChat = (participantId: string) =>
    navigate(`/app/inbox/${participantId}`);
  useEffect(() => {
    const fetchParticipant = async () => {
      const user = await getUser(chat.participants[1]);

      if (user) {
        setParticipant(user);
      }
    };

    fetchParticipant();
  }, [chat._id, chat.participants, getUser]);

  return (
    <li
      className={`relative flex group cursor-pointer transition-all ease-in-out p-2 ${
        isSidebarOpen
          ? `gap-2 max-w-67 items-center p-1 pr-3 rounded-3xl ${
              isActive
                ? "bg-background-light-base dark:bg-background-dark-base"
                : "bg-transparent hover:bg-background-light-base/50 hover:dark:bg-background-dark-base/50"
            }`
          : `gap-0 rounded-full ${
              isActive
                ? "bg-background-light-base dark:bg-background-dark-base translate-x-9 chat-card-shrink-active [--shadow-color:#fff] dark:[--shadow-color:#0f1115]"
                : "bg-transparent"
            }`
      }`}
      onClick={() => selectChat(participant?._id ?? "")}
    >
      <div
        className={`relative flex-none transition-all ease-in-out rounded-full p-1 flex items-center justify-center aspect-square ${chat.unreadMessages > 0 && !isActive && !isSidebarOpen ? "bg-background-light-primary" : !isActive ? "bg-background-light-surface-2 dark:bg-background-dark-surface-2" : "bg-background-light-base dark:bg-background-dark-base"} ${isActive && !isSidebarOpen && "bg-background-light-surface-2 dark:bg-background-dark-surface-2"} ${isSidebarOpen ? "" : "group-hover:scale-110"}`}
      >
        {chat.unreadMessages > 0 && !isActive && !isSidebarOpen && (
          <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-0 -right-2">
            {chat.unreadMessages > 99 ? `+${99}` : chat.unreadMessages}
          </span>
        )}

        {chat.unreadMessages === 0 &&
          chat.lastMessage.sender == authNUser?._id &&
          !isSidebarOpen && (
            <span className="absolute bg-background-light-base dark:bg-background-dark-base flex items-center justify-center rounded-full top-0 -right-2 w-6 h-5 shadow-xl/30 overflow-hidden">
              <MessageStatusIcon
                weight={chat.lastMessage.status == "sent" ? "base" : "thin"}
                status={chat.lastMessage.status}
                className={`${chat.lastMessage.status === "sent" ? "size-3" : "size-6"}`}
              />
            </span>
          )}

        {participant?.isActive && (
          <span
            className={`absolute flex items-center w-3 h-3 justify-center rounded-full bottom-1 right-1 ${isActive ? "bg-background-light-base dark:bg-background-dark-base" : "bg-background-light-surface-2 dark:bg-background-dark-surface-2"}`}
          >
            <span className="bg-foreground-dark-success size-[0.55rem] aspect-square rounded-full"></span>
          </span>
        )}
        {participant?.profileImage ? (
          <img
            src={participant?.profileImage}
            alt={participant?.firstName}
            className="size-10 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="size-10 rounded-full flex-none overflow-hidden">
            <Avatar
              gender={participant?.gender as Gender}
              age={calculateAge(participant?.birthdate as string)}
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      {isSidebarOpen && (
        <div className="flex flex-1 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <div className="flex gap-1 justify-between items-center">
            <p className="line-clamp-1 text-sm font-semibold flex-1">
              {contacts[participant?._id ?? ""]
                ? `${contacts[participant?._id ?? ""]?.firstName} ${contacts[participant?._id ?? ""]?.lastName}`
                : `${participant?.firstName} ${participant?.lastName}`}
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
              <span className="text-white text-xs bg-background-light-primary w-7 py-0.5 flex items-center justify-center rounded-full">
                {chat.unreadMessages > 99 ? `+${99}` : chat.unreadMessages}
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
        <Label
          text={
            contacts[participant?._id ?? ""]?.firstName ??
            participant?.firstName ??
            ""
          }
          isSide={true}
        />
      )}
    </li>
  );
};

export default ChatCard;
