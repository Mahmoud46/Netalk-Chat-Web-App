import { useState, lazy } from "react";
import { useAuth, useChat, useTheme } from "../../hooks";
import type { Gender, Message } from "../../types";
import { formatTime12Hours } from "../../utils/format";
import { MessageStatusIcon } from "../icons/ChatIcon";
import CommonIcon from "../icons/CommonIcon";
import { MediaFile } from "../common/Attachment";
import { Link } from "react-router-dom";
import { Avatar } from "../icons/Avatar";
import { calculateAge } from "../../utils/helpers";

const AttachmentCard = lazy(() =>
    import("../common/Attachment").then((module) => ({
      default: module.AttachmentCard,
    })),
  ),
  MessageDropList = lazy(() =>
    import("../common/DropList").then((module) => ({
      default: module.MessageDropList,
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

  const toggleMessageDropList = () =>
    setIsMessageDropListActive((prev) => !prev);

  return (
    <div
      className={`flex relative items-start gap-4 ${flowRight && "self-end"} ${!flowRight && "flex-row-reverse self-start"}`}
    >
      <button
        className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isMessageDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary"}`}
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
          className={`flex flex-col relative w-fit max-w-100 min-w-40 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl gap-2`}
        >
          {message.attachment &&
            (message.attachment.type == "image" ||
            message.attachment.type == "video" ? (
              <MediaFile mediaFile={message.attachment} />
            ) : (
              <AttachmentCard attachment={message.attachment} />
            ))}
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
        </div>

        {showProfileImage && (
          <Link
            to={`/app/profile/${
              flowRight ? authNUser.username : currentParticipant?.username
            }`}
            className={`${flowRight ? "self-end translate-x-5 -translate-y-5" : "-translate-x-5 -translate-y-5"} p-2 bg-background-light-base dark:bg-background-dark-base rounded-full w-fit cursor-pointer`}
          >
            {flowRight ? (
              authNUser.profileImage ? (
                <img
                  src={authNUser.profileImage}
                  alt=""
                  loading="lazy"
                  className="size-7 rounded-full"
                />
              ) : (
                <div className="size-7 rounded-full flex-none overflow-hidden">
                  <Avatar
                    gender={authNUser?.gender as Gender}
                    age={calculateAge(authNUser?.birthdate as string)}
                    className="w-full h-full object-cover"
                  />
                </div>
              )
            ) : currentParticipant?.profileImage ? (
              <img
                src={currentParticipant.profileImage}
                alt=""
                loading="lazy"
                className="size-7 rounded-full"
              />
            ) : (
              <div className="size-7 rounded-full flex-none overflow-hidden">
                <Avatar
                  gender={currentParticipant?.gender as Gender}
                  age={calculateAge(currentParticipant?.birthdate as string)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </Link>
        )}
      </div>

      <MessageDropList
        isActive={isMessageDropListActive}
        isLeft={flowRight}
        showTranslateButton={isMessageTranslateButtonShown}
        setIsActive={setIsMessageDropListActive}
      />
    </div>
  );
};

export default MessageBubble;
