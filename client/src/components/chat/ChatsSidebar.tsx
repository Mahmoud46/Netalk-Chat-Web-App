import React, { Suspense, useState, type ReactNode } from "react";

import Loader from "../common/Loader";
import type { Chat } from "../../types";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";

const ChatCard = React.lazy(() => import("./ChatCard"));

const ChatsSidebar = ({ chats }: { chats: Chat[] }): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleActive = () => setOpen((prev) => !prev);
  return (
    <aside
      className={`flex-none ${open ? "min-w-70 items-start pl-12" : "min-w-20 items-center"} transition-all ease-in-out duration-300 h-dvh bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 pl-10 flex flex-col gap-4`}
    >
      <div className="size-15 w-full relative -translate-y-2 translate-x-2">
        <div className="absolute top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-2 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
          <button
            onClick={toggleActive}
            className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-7 transition-all ease-in-out ${open ? "rotate-180" : ""}`}
            />
            <Label text="Expand" />
          </button>
        </div>
      </div>
      <button className="relative group p-1.5 cursor-pointer rounded-full bg-background-light-secondary dark:bg-background-dark-secondary transition-all ease-in-out hover:scale-110">
        <CommonIcon label="search" className="size-7" weight="thin" />
        <Label text="Search" isSide={true} />
      </button>
      <ul className="flex flex-col">
        {chats.map((chat) => (
          <Suspense fallback={<Loader />} key={chat._id}>
            <ChatCard chat={chat} />
          </Suspense>
        ))}
      </ul>
    </aside>
  );
};

export default ChatsSidebar;
