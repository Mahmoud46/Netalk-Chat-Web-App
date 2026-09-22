import React, { Suspense, useState, type ReactNode } from "react";

import Loader from "../common/Loader";
import type { Chat } from "../../types";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";

const ChatCard = React.lazy(() => import("./ChatCard"));

const ChatsSidebar = ({
  chats,
  activeArchiveTab,
  setActiveArchiveTab,
}: {
  chats: Chat[];
  activeArchiveTab: boolean;
  setActiveArchiveTab: React.Dispatch<React.SetStateAction<boolean>>;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleActive = () => setOpen((prev) => !prev);
  const toggleActiveArchiveTab = () => setActiveArchiveTab((prev) => !prev);
  return (
    <aside
      className={`flex-none ${open ? "min-w-70 items-start pl-12" : "min-w-20 items-center"} transition-all ease-in-out duration-300 h-dvh bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 pl-10 flex flex-col gap-4`}
    >
      <div className="size-15 w-full relative -translate-y-2 translate-x-2">
        <div className="absolute flex top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-1.5 pt-3 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
          <div
            className={`rounded-full z-30 relative flex ${open ? "flex-1 items-center" : "flex-none"}`}
          >
            <button
              className={`${open ? "absolute" : "relative"} flex-none group p-1.5 cursor-pointer rounded-full hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary transition-all ease-in-out ${open ? "pointer-events-none" : ""}`}
              onClick={() => (!open ? toggleActive() : null)}
            >
              <CommonIcon
                label="search"
                className={`size-7 ${open ? "opacity-50" : ""}`}
                weight="thin"
              />
              {!open && <Label text="Search" />}
            </button>
            {open && (
              <input
                type="text"
                className="w-full text-sm h-full outline-none bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-1.5 pl-12 text-foreground-light-secondary dark:text-foreground-dark-secondary rounded-3xl focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
                placeholder="Search chat"
              />
            )}
          </div>
          <button
            onClick={toggleActive}
            className="relative flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-7 transition-all ease-in-out ${open ? "rotate-180" : ""}`}
            />
            <Label text={open ? "Close" : "Expand"} />
          </button>
        </div>
      </div>
      <ul className="flex flex-col">
        <button
          type="button"
          className="cursor-pointer"
          onClick={toggleActiveArchiveTab}
        >
          {activeArchiveTab ? "B" : "A"}
        </button>
        {chats.map((chat) => (
          <Suspense fallback={<Loader />} key={chat._id}>
            <ChatCard chat={chat} isSidebarOpen={open} />
          </Suspense>
        ))}
      </ul>
    </aside>
  );
};

export default ChatsSidebar;
