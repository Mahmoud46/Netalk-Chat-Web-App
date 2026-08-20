import { useState, type ReactNode } from "react";
import React from "react";
import CommonIcon from "../icons/CommonIcon";
import ChatIcon from "../icons/ChatIcon";

const AttachmentDropList = React.lazy(() =>
    import("../common/DropList").then((module) => ({
      default: module.AttachmentDropList,
    })),
  ),
  EmojisDropList = React.lazy(() =>
    import("../common/DropList").then((module) => ({
      default: module.EmojiDropList,
    })),
  );

const MessageComposer = (): ReactNode => {
  const [isAttchmentDropListActive, setIsAttchmentDropListActive] =
      useState<boolean>(false),
    [isEmojisDropListActive, setIsEmojisDropListActive] =
      useState<boolean>(false);

  const toggleAttachmentDropList = () => {
      if (isEmojisDropListActive) setIsEmojisDropListActive((prev) => !prev);
      setIsAttchmentDropListActive((prev) => !prev);
    },
    toggleEmojisDropList = () => {
      if (isAttchmentDropListActive)
        setIsAttchmentDropListActive((prev) => !prev);
      setIsEmojisDropListActive((prev) => !prev);
    };

  return (
    <footer className="sticky bottom-0 w-full flex flex-col gap-3 z-20">
      <div className="relative">
        <AttachmentDropList isActive={isAttchmentDropListActive} />
        <EmojisDropList isActive={isEmojisDropListActive} />
        <form className=" bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-full w-full flex justify-between items-center">
          <div className="flex-none">
            <button
              type="button"
              className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isAttchmentDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary hover:scale-110"}`}
              onClick={toggleAttachmentDropList}
            >
              <ChatIcon
                label="paperclip"
                weight="thin"
                className="size-6.5 cursor-pointer"
              />
            </button>
            <button
              type="button"
              className={`cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out ${isEmojisDropListActive && "bg-background-light-secondary dark:bg-background-dark-secondary hover:scale-110"}`}
              onClick={toggleEmojisDropList}
            >
              <ChatIcon
                label="sticker"
                weight="thin"
                className="size-6.5 cursor-pointer"
              />
            </button>
          </div>
          <input
            type="text"
            placeholder="Type a message…"
            className="flex-1 p-2 outline-none"
          />
          <button
            className="gradient cursor-pointer rounded-full p-2 group hover:scale-110 flex-none"
            type="submit"
          >
            <CommonIcon
              label="paper_plane"
              soild={true}
              weight="thin"
              className="size-6.5 transition-all ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </form>
      </div>
    </footer>
  );
};

export default MessageComposer;
