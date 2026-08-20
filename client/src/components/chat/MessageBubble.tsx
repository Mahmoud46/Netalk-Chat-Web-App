import { useState, lazy } from "react";
import { useAuth, useChat, useTheme } from "../../hooks";
import type { Message } from "../../types";
import { formatTime12Hours } from "../../utils/format";
import { MessageStatusIcon } from "../icons/ChatIcon";
import CommonIcon from "../icons/CommonIcon";

const AttachmentCard = lazy(() =>
    import("../common/Attachment").then((module) => ({
      default: module.AttachmentCard,
    })),
  ),
  MessageDropList = lazy(() =>
    import("../common/DropList").then((module) => ({
      default: module.MessageDropList,
    })),
  ),
  EmojiDropListHorizontal = lazy(() =>
    import("../common/DropList").then((module) => ({
      default: module.EmojiDropListHorizontal,
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
    { messageFontSize, isMessageTranslateButtonShown } = useTheme(),
    flowRight = message.sender === authNUser?._id;

  const [isMessageDropListActive, setIsMessageDropListActive] =
    useState<boolean>(false);
  const [isEmojieDropListActive, setIsEmojiDropListActive] =
    useState<boolean>(false);

  const toggleMessageDropList = () =>
    setIsMessageDropListActive((prev) => !prev);
  const toggleEmojiDropList = () => setIsEmojiDropListActive((prev) => !prev);

  return (
    <div
      className={`flex relative items-start gap-4 ${flowRight && "self-end"} ${!flowRight && "flex-row-reverse self-start"}`}
    >
      <button
        className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isMessageDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary hover:scale-110"}`}
        type="button"
        onClick={toggleMessageDropList}
      >
        <CommonIcon
          label="dots_vertical_rounded"
          className="size-5.5"
          soild={false}
        />
      </button>

      <div className={`flex flex-col max-w-100`}>
        <div
          className={`flex flex-col relative w-fit max-w-100 min-w-40 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl gap-1.5`}
        >
          {message.attachment && (
            <AttachmentCard attachment={message.attachment} />
          )}
          <div className="flex flex-col">
            {message.text && (
              <p
                className="text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
                style={{ fontSize: `${messageFontSize}px` }}
              >
                {message.text}
              </p>
            )}
            <div
              className={`self-end flex items-center ${message.status == "sent" && "gap-1"}`}
            >
              <time
                dateTime={message.createdAt}
                className={`text-xs ${message.status == "read" && flowRight ? "text-foreground-light-primary" : "text-foreground-light-secondary dark:text-foreground-dark-secondary"}`}
              >
                {formatTime12Hours(message.createdAt)}
              </time>
              {flowRight && (
                <MessageStatusIcon
                  weight={message.status == "sent" ? "base" : "thin"}
                  status={message.status}
                  className={message.status == "sent" ? "size-3" : "size-6"}
                />
              )}
            </div>
          </div>

          <button
            type="button"
            className={`absolute -bottom-4 ${flowRight ? "left-0" : "right-0"} group cursor-pointer p-2 rounded-full bg-background-light-surface-3 dark:bg-background-dark-surface-3 hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out`}
            onClick={toggleEmojiDropList}
          >
            <CommonIcon
              label="plus"
              className={`size-4.5 ${isEmojieDropListActive && "rotate-45"} ease-in-out transition-all`}
              soild={false}
            />
          </button>

          <EmojiDropListHorizontal isActive={isEmojieDropListActive} />
        </div>

        {showProfileImage && (
          <div
            className={`${flowRight ? "self-end translate-x-5 -translate-y-5" : "-translate-x-5 -translate-y-5"} p-2 bg-background-light-base dark:bg-background-dark-base rounded-full w-fit cursor-pointer`}
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

      <MessageDropList
        isActive={isMessageDropListActive}
        isLeft={flowRight}
        showTranslateButton={isMessageTranslateButtonShown}
      />
    </div>
  );
};

export default MessageBubble;
