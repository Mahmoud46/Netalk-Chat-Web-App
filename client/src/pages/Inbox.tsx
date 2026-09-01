import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { type ReactNode } from "react";
import Loader from "../components/common/Loader";

import { useAuth, useChat } from "../hooks";
import { useParams } from "react-router-dom";

const ChatsSidebar = lazy(() => import("../components/chat/ChatsSidebar"));
const ChatHeader = lazy(() => import("../components/chat/ChatHeader"));
const ChatFeed = lazy(() => import("../components/chat/ChatFeed"));
const MessageComposer = lazy(
  () => import("../components/chat/MessageComposer"),
);
const ChatFreshThreadWindow = lazy(
  () => import("../components/chat/ChatFreshThread"),
);
const ChatEmptyStateWindow = lazy(
  () => import("../components/chat/ChatEmptyState"),
);
const SideProfilePanel = lazy(
  () => import("../components/chat/SideProfilePanel"),
);

export default function Inbox(): ReactNode {
  const {
    currentChat,
    setCurrentChat,
    currentParticipant,
    setCurrentParticipant,
    chats,
    contacts,
    getChatByParticipantId,
    getUser,
  } = useChat();
  const { authNUser } = useAuth();
  const { id } = useParams();

  const [activeSideProfilePanel, setActiveSideProfilePanel] =
    useState<boolean>(false);

  const filteredChats = useMemo(() => {
    if (!chats) return [];
    const archived = authNUser?.archivedChats || [];
    return chats.filter((chat) => !archived.includes(chat._id));
  }, [chats, authNUser?.archivedChats]);

  useEffect(() => {
    const init = async () => {
      if (id) {
        const user = await getUser(id);
        const chat = await getChatByParticipantId(id);
        setCurrentParticipant(user ?? null);
        setCurrentChat(chat ?? null);
      } else {
        setCurrentParticipant(null);
        setCurrentChat(null);
      }
    };
    init();
  }, [id]);

  return (
    <div className="h-full w-full flex">
      <Suspense fallback={<Loader />}>
        <ChatsSidebar chats={filteredChats} />
      </Suspense>

      {currentParticipant && (
        <>
          <div className="flex-1 min-w-215 h-full flex items-center flex-col px-10 py-4 overflow-auto stable-gutter-container dark:text-foreground-dark-secondary gap-4 scrollbar-thin mr-2">
            <Suspense fallback={<Loader />}>
              <ChatHeader
                toggleButtonClickAction={() => setActiveSideProfilePanel(true)}
              />
            </Suspense>

            <Suspense fallback={<Loader />}>
              {currentChat ? (
                <ChatFeed currentChatId={currentChat._id} />
              ) : (
                <ChatFreshThreadWindow
                  currentParticipant={currentParticipant}
                />
              )}
            </Suspense>

            <Suspense fallback={<Loader />}>
              <MessageComposer />
            </Suspense>
          </div>

          {
            <Suspense fallback={<Loader />}>
              <SideProfilePanel
                user={currentParticipant}
                contacts={contacts}
                currentChat={currentChat}
                toggleButtonClickAction={() => setActiveSideProfilePanel(false)}
                isActive={activeSideProfilePanel}
              />
            </Suspense>
          }
        </>
      )}

      {!(currentParticipant || currentChat) && (
        <Suspense fallback={<Loader />}>
          <ChatEmptyStateWindow />
        </Suspense>
      )}
    </div>
  );
}
