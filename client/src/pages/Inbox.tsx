import React, { Suspense } from "react";
import { type ReactNode } from "react";
import Loader from "../components/common/Loader";

import { useAuth, useChat } from "../hooks";

const ChatsSidebar = React.lazy(
    () => import("../components/chat/ChatsSidebar"),
  ),
  ChatHeader = React.lazy(() => import("../components/chat/ChatHeader")),
  ChatFeed = React.lazy(() => import("../components/chat/ChatFeed")),
  MessageComposer = React.lazy(
    () => import("../components/chat/MessageComposer"),
  ),
  ChatFreshThreadWindow = React.lazy(
    () => import("../components/chat/ChatFreshThread"),
  ),
  ChatEmptyStateWindow = React.lazy(
    () => import("../components/chat/ChatEmptyState"),
  ),
  SideProfilePanel = React.lazy(
    () => import("../components/chat/SideProfilePanel"),
  );

export default function Inbox(): ReactNode {
  const { currentChat, currentParticipant, chats, contacts } = useChat(),
    { authNUser } = useAuth();

  return (
    <div className="h-full w-full flex">
      <ChatsSidebar
        chats={chats.filter(
          (chat) => !authNUser?.archivedChats.includes(chat._id),
        )}
      />
      {currentParticipant && (
        <>
          <div className="flex-1 h-full flex items-center flex-col px-10 py-4 overflow-auto stable-gutter-container dark:text-foreground-dark-secondary gap-4 scrollbar-thin mr-2">
            <Suspense fallback={<Loader />}>
              <ChatHeader />
            </Suspense>
            {currentChat ? (
              <Suspense fallback={<Loader />}>
                <ChatFeed currentChatId={currentChat._id} />
              </Suspense>
            ) : (
              <Suspense fallback={<Loader />}>
                <ChatFreshThreadWindow
                  currentParticipant={currentParticipant}
                />
              </Suspense>
            )}
            <MessageComposer />
          </div>
          <SideProfilePanel
            user={currentParticipant}
            contacts={contacts}
            currentChat={currentChat}
          />
        </>
      )}
      {!(currentParticipant || currentChat) && <ChatEmptyStateWindow />}
    </div>
  );
}
