import type { ReactNode } from "react";
import { useAuth, useChat } from "../../hooks";
import ChatIcon from "../icons/chat/ChatIcon";
import CommonIcon from "../icons/common/CommonIcon";
import { EMOJIS_LIST } from "../../config/emojis";
import EmojiIcon from "../icons/emojis/EmojiIcon";

export const ChatDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  const { authNUser } = useAuth(),
    { currentChat } = useChat(),
    isArchived = authNUser?.archivedChats.includes(currentChat?._id as string);
  return (
    <div
      className={`absolute top-7/6 right-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit self-end rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
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

export const AttachmentDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute bottom-7/6 left-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="image" weight="thin" className="size-6.5" />
        Image or Video
      </button>
      <button className="cursor-pointer p-2 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary w-full flex justify-start gap-3 items-center rounded-2xl">
        <ChatIcon label="file" weight="thin" className="size-6.5" />
        File or Document
      </button>
    </div>
  );
};

export const ContactEntryDropList = ({
  isActive = false,
}: {
  isActive?: boolean;
}): ReactNode => {
  const { currentContactEntry } = useChat(),
    { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(currentContactEntry?._id ?? "") ?? false,
    isMuted: boolean =
      authNUser?.mutedUsers.includes(currentContactEntry?._id ?? "") ?? false;
  return (
    <div
      className={`absolute top-0 z-10 -right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
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
        className={`cursor-pointer p-2 text-sm text-foreground-light-danger dark:text-foreground-dark-danger ${isBlocked ? "hover:bg-green-400/10 dark:hover:bg-green-700/20" : "hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
      >
        <CommonIcon
          label={isBlocked ? "" : "user_x"}
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
}: {
  isActive?: boolean;
  userId: string;
}): ReactNode => {
  const { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(userId ?? "") ?? false,
    isMuted: boolean = authNUser?.mutedUsers.includes(userId ?? "") ?? false;
  return (
    <div
      className={`absolute bottom-5/6 z-10 -right-10 bg-background-light-surface-3 dark:bg-background-dark-surface-3 max-w-fit rounded-3xl p-2 flex flex-col items-start scale-0 ${isActive && "scale-100"} transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <button
        className={`cursor-pointer p-2 text-sm ${isBlocked ? "hover:bg-background-light-success/10 dark:hover:bg-background-dark-success/20 text-background-dark-success" : "hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} w-full flex justify-start gap-3 items-center rounded-2xl`}
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
}: {
  isActive?: boolean;
}): ReactNode => {
  return (
    <div
      className={`absolute bottom-7/6 left-15 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-2xl p-2 grid grid-cols-4 scale-0 ${isActive && "scale-100"} transition-all ease-in-out`}
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
