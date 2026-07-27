import type { ReactNode } from "react";
import type { User } from "../../types";
import CommonIcon from "../icons/CommonIcon";
import EmojiIcon from "../icons/EmojiIcon";

const ChatFreshThread = ({
  currentParticipant,
}: {
  currentParticipant: User;
}): ReactNode => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      <div className="p-2 rounded-full gradient shadow-glow [--shadow-color:#fd5b5d] relative flex items-center justify-center">
        <img
          src={currentParticipant.profileImage}
          alt={currentParticipant.firstName}
          className="size-35 rounded-full"
          loading="lazy"
        />
        <div className="absolute bg-background-light-base dark:bg-background-dark-base p-1 rounded-full flex items-center justify-center top-2 right-2">
          <CommonIcon label="sparkles" weight="thin" className="size-7.5" />
        </div>
      </div>
      <div className="flex items-center flex-col">
        <h1 className="text-lg dark:text-background-light-surface-3">
          Meet{" "}
          <span className="text-xl font-semibold gradient bg-clip-text text-transparent">
            {currentParticipant.firstName}
          </span>
        </h1>
        <p className="text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          This conversation is ready when you are.
        </p>
      </div>
      <button className="relative gradient text-white flex gap-2 items-center p-2 pr-4 rounded-full cursor-pointer text-sm group transition-all ease-in-out hover:scale-105">
        <EmojiIcon label="waving_hand" className="size-7" />
        <p className="">Say Hello!</p>
        <CommonIcon
          label="stroke_freehand"
          className="absolute top-1/6 right-1/6 pointer-events-none size-0 group-hover:size-25 group-hover:-top-12 group-hover:pointer-events-auto group-hover:-right-10 transition-all ease-in-out"
        />
      </button>
    </div>
  );
};

export default ChatFreshThread;
