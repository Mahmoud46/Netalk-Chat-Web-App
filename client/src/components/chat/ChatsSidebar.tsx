import React, { Suspense, type ReactNode } from "react";

import Loader from "../common/Loader";
import type { Chat } from "../../types";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";

const ChatCard = React.lazy(() => import("./ChatCard"));

const ChatsSidebar = ({ chats }: { chats: Chat[] }): ReactNode => {
  return (
    <aside className="min-w-20 h-dvh bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 pl-10 flex flex-col items-center gap-4">
      {/* <button className="relative bg-background-light-base dark:bg-background-dark-base -translate-y-2 translate-x-2 p-1 rounded-bl-3xl cursor-pointer group top-right-cornered-toggle-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115] self-end">
        <CommonIcon
          label="chevron_right"
          weight="thin"
          className="size-7 transition-all ease-in-out group-hover:translate-x-4 translate-x-2"
        />
      </button> */}
      <div className="size-15 w-full relative -translate-y-2 translate-x-2">
        <div className="absolute top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-2 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
          <button className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="size-7 transition-all ease-in-out"
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
