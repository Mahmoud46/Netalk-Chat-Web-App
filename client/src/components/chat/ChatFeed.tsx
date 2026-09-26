import React, { useEffect, useRef, useState, type ReactNode } from "react";
import { useAuth, useChat } from "../../hooks";
import type { MessagesTimeline, User } from "../../types";
import messagesTimelining from "../../utils/map_messages";
import { showProfileImage } from "../../utils/helpers";

const MessageBubble = React.lazy(() => import("./MessageBubble"));

const ChatFeed = ({
  currentChatId,
  currentParticipant,
}: {
  currentChatId: string;
  currentParticipant: User;
}): ReactNode => {
  const { getMessages } = useChat(),
    [messagesTimeline, setMessagesTimeline] = useState<MessagesTimeline>({});
  const { authNUser } = useAuth();

  const isBlocked =
    authNUser?.blockedUsers.includes(currentParticipant._id) ?? false;

  const scrollEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getMessages(currentChatId);
      if (messages) {
        const messagesTimeline: MessagesTimeline = messagesTimelining(messages);
        setMessagesTimeline(messagesTimeline);
      }
      return;
    };

    fetchMessages();
  }, [currentChatId]);

  useEffect(() => {
    if (scrollEnd.current && messagesTimeline)
      scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }, [currentChatId, messagesTimeline]);

  return (
    <>
      <div className="flex-1 w-full flex flex-col gap-3 items-center px-4">
        {Object.keys(messagesTimeline).length > 0 &&
          Object.entries(messagesTimeline).map(([date, messages]) => (
            <div
              key={date}
              className="flex flex-col gap-3 px-4 max-w-200 w-full"
            >
              <time
                dateTime={date}
                className="self-center bg-background-light-surface-2 dark:bg-background-dark-surface-2 text-foreground-light-third dark:text-foreground-dark-secondary p-2 text-xs rounded-full px-4"
              >
                {date}
              </time>
              {messages.map((message, index) => (
                <MessageBubble
                  message={message}
                  key={message._id}
                  showProfileImage={showProfileImage(messages, index)}
                />
              ))}
            </div>
          ))}
        {isBlocked && (
          <div>
            <h3 className="text-foreground-dark-danger text-sm text-center">
              This chat is on pause
            </h3>
            <p className="text-xs text-center">
              You’ve blocked {currentParticipant.firstName}{" "}
              {currentParticipant.lastName}, so you can't send or receive new
              messages.
            </p>
          </div>
        )}
        <div className="" ref={scrollEnd}></div>
      </div>
      {isBlocked && (
        <button
          type="button"
          className="w-fit gap-4 flex gradient p-2.5 px-4 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
        >
          <p className="">Unblock {currentParticipant.firstName}</p>
        </button>
      )}
    </>
  );
};

export default ChatFeed;
