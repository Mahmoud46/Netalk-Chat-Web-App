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
        <div className="absolute bg-background-light-base dark:bg-background-dark-base p-1 rounded-full flex items-center justify-center top-2 right-2 shadow-xl/30">
          <CommonIcon label="sparkles" weight="thin" className="size-7.5" />
        </div>
      </div>
      <div className="flex items-center flex-col gap-2 text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <h1 className="text-2xl font-semibold dark:text-background-light-surface-3">
          Meet{" "}
          <span className="text-3xl font-semibold gradient bg-clip-text text-transparent">
            {currentParticipant.firstName}
          </span>
          !
        </h1>
        <p className="text-base text-foreground-light-secondary dark:text-foreground-dark-secondary">
          This conversation is ready when you are.
        </p>
      </div>
      <button
        type="button"
        className="w-fit gap-4 flex gradient p-2.5 px-4 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
      >
        <EmojiIcon label="waving_hand" className="size-6" />
        <p className="">Say Hello!</p>
      </button>
    </div>
  );
};

export default ChatFreshThread;
