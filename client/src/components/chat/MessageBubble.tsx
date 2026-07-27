import React from "react";
import { useAuth, useChat, useTheme } from "../../hooks";
import type { Message } from "../../types";
import { formatTime12Hours } from "../../utils/format";
import { MessageStatusIcon } from "../icons/ChatIcon";

const AttachmentCard = React.lazy(() =>
  import("../common/Attachment").then((module) => ({
    default: module.AttachmentCard,
  })),
);

const MessageBubble = ({
  message,
  showProfileImage = true,
}: {
  message: Message;
  showProfileImage?: boolean;
}) => {
  const { authNUser } = useAuth(),
    { currentParticipant } = useChat(),
    { messageFontSize } = useTheme(),
    flowRight = message.sender === authNUser?._id;

  return (
    <div className={`${flowRight && "self-end"} flex flex-col`}>
      <div
        className={`flex flex-col w-fit max-w-100 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl gap-1.5`}
      >
        {message.attachment && (
          <AttachmentCard attachment={message.attachment} />
        )}
        {message.text && (
          <p
            className="text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
            style={{ fontSize: `${messageFontSize}px` }}
          >
            {message.text}
          </p>
        )}
        <div className="self-end flex items-center gap-1">
          <time
            dateTime={message.createdAt}
            className={`text-[10px] ${message.status == "read" && flowRight ? "text-foreground-light-primary" : "text-foreground-light-secondary dark:text-foreground-dark-secondary"}`}
          >
            {formatTime12Hours(message.createdAt)}
          </time>
          {flowRight && (
            <MessageStatusIcon
              weight={message.status == "sent" ? "base" : "thin"}
              status={message.status}
              className={message.status == "sent" ? "size-3" : "size-5"}
            />
          )}
        </div>
      </div>

      {showProfileImage && (
        <div
          className={`${flowRight ? "self-end translate-x-5 -translate-y-3" : "-translate-x-5 -translate-y-3"} p-2 bg-background-light-base dark:bg-background-dark-base rounded-full w-fit cursor-pointer`}
        >
          <img
            src={
              flowRight
                ? authNUser.profileImage
                : currentParticipant?.profileImage
            }
            alt=""
            loading="lazy"
            className="size-7 rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
