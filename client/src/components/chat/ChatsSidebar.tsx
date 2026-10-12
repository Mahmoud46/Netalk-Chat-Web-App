import React, { Suspense, useEffect, useState, type ReactNode } from "react";

import Loader from "../common/Loader";
import type { Chat } from "../../types";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";
import { useChat } from "../../hooks";
import { BrandIcon } from "../icons/BrandIcon";

const ChatCard = React.lazy(() => import("./ChatCard")),
  ArchiveChatsCard = React.lazy(() =>
    import("./ChatCard").then((module) => ({
      default: module.ArchiveChatsCard,
    })),
  );

const ChatsSidebar = ({
  chats,
  activeArchiveTab,
  setActiveArchiveTab,
  includesArchivedChats,
}: {
  chats: Chat[];
  activeArchiveTab: boolean;
  setActiveArchiveTab: React.Dispatch<React.SetStateAction<boolean>>;
  includesArchivedChats: boolean;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  const { currentChat, currentParticipant } = useChat();
  const toggleActive = () => setOpen((prev) => !prev);
  const toggleActiveArchiveTab = () => setActiveArchiveTab((prev) => !prev);

  const [chatsQueueStart, setChatsQueueStart] = useState<number>(0),
    [chatsQueueEnd, setChatsQueueEnd] = useState<number>(5);
  useEffect(() => {
    const resetQueuePointers = async () => {
      setChatsQueueStart(0);
      setChatsQueueEnd(5);
    };
    resetQueuePointers();
  }, [activeArchiveTab]);
  const queueDown = () => {
      setChatsQueueStart((prev) => prev + 1);
      setChatsQueueEnd((prev) => prev + 1);
    },
    queueUp = () => {
      setChatsQueueStart((prev) => prev - 1);
      setChatsQueueEnd((prev) => prev - 1);
    };
  return (
    <aside
      className={`flex-none ${open ? "min-w-70 items-start md:pl-12" : "min-w-20 items-center"} ${currentParticipant ? "max-md:hidden" : "max-md:w-full max-md:fixed"} transition-all ease-in-out duration-300 h-dvh bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 max-md:px-4 md:pl-10 flex flex-col gap-4`}
    >
      <div className="flex w-full">
        <div className="pt-3 md:hidden flex-none">
          <BrandIcon className="size-7 flex-none" />
        </div>
        <div className="size-15 w-full flex relative -translate-y-2 translate-x-2 max-md:translate-x-3.5">
          <div className="absolute flex items-center top-0 right-0 max-md:w-full bg-background-light-base dark:bg-background-dark-base p-1.5 pt-3 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
            <div
              className={`rounded-full z-30 relative flex ${open ? "flex-1 items-center md:mr-1.5" : "flex-none"} max-md:flex-1 max-md:items-center`}
            >
              <button
                className={`${open ? "absolute" : "relative"} max-md:absolute flex-none group p-1.5 md:cursor-pointer rounded-full hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary transition-all ease-in-out ${open ? "pointer-events-none" : ""}`}
                onClick={() => (!open ? toggleActive() : null)}
              >
                <CommonIcon
                  label="search"
                  className={`size-7 ${open ? "opacity-50" : ""} max-md:opacity-50`}
                  weight="thin"
                />
                {!open && <Label text="Search" />}
              </button>
              <input
                type="text"
                className={`bg-background-light-surface-2 pl-11 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all ${!open && "md:hidden"}`}
                placeholder="Search chats..."
              />
            </div>
            <button
              onClick={toggleActive}
              className="relative flex-none max-md:hidden group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 transition-all ease-in-out ${open ? "rotate-180" : ""} max-md:hidden`}
              />
              <Label text={open ? "Close" : "Expand"} />
            </button>
          </div>
        </div>
      </div>
      <ul
        className={`flex flex-col flex-1 ${open && "overflow-auto"} max-md:overflow-auto max-md:pb-30`}
      >
        {includesArchivedChats && (
          <Suspense fallback={<Loader />}>
            <ArchiveChatsCard
              isSidebarOpen={open}
              toggleArchiveTab={toggleActiveArchiveTab}
              activeArchiveTab={activeArchiveTab}
            />
          </Suspense>
        )}
        {chatsQueueStart > 0 && !open && (
          <button
            onClick={queueUp}
            className="relative max-md:hidden self-center group cursor-pointer p-1.5 flex-none aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-7 flex-none rotate-270 hover:-translate-y-1 ease-in-out transition-all`}
            />
            <Label text="Up" isSide={true} />
          </button>
        )}
        {!open && (
          <div
            className={`flex flex-col w-full ${open && "md:hidden"} max-md:hidden`}
          >
            {chats.slice(chatsQueueStart, chatsQueueEnd).map((chat) => (
              <Suspense fallback={<Loader />} key={chat._id}>
                <ChatCard chat={chat} isSidebarOpen={open} />
              </Suspense>
            ))}
          </div>
        )}

        <div className={`flex flex-col w-full ${!open && "md:hidden"}`}>
          {chats.map((chat) => (
            <Suspense fallback={<Loader />} key={chat._id}>
              <ChatCard chat={chat} isSidebarOpen={open} />
            </Suspense>
          ))}
        </div>

        {chatsQueueEnd <= chats.length - 1 && !open && (
          <button
            onClick={queueDown}
            className="relative self-center max-md:hidden group cursor-pointer p-1.5 flex-none aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-7 flex-none rotate-90 hover:translate-y-1 ease-in-out transition-all`}
            />
            <Label text="Down" isSide={true} />
          </button>
        )}
      </ul>
      {currentChat && (
        <button
          className={`rounded-full gradient mb-4 text-white cursor-pointer relative group transition-all ease-in-out hover:scale-105 font-semibold ${open ? "p-2.5 px-4 flex w-full rounded-3xl gap-4 self-center justify-center" : "p-2"} max-md:hidden`}
        >
          <CommonIcon
            label="plus"
            soild={true}
            weight={open ? "bold" : "base"}
            className={`${open ? "size-6" : "size-7"} transition-all ease-in-out`}
          />

          {!open && <Label text="Start Chat" isSide={true} className="w-max" />}
          {open && <p>Start Chat</p>}
        </button>
      )}
      <div className="px-4 md:hidden fixed bottom-25 right-4 flex justify-end">
        <button
          type="button"
          className="gap-4 flex justify-center gradient p-2 rounded-3xl shadow-xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
        >
          <CommonIcon label="plus" soild={true} className="size-7" />
        </button>
      </div>
    </aside>
  );
};

export default ChatsSidebar;
