import type { ReactNode } from "react";
import { useChat, useTheme } from "../../hooks";
import CommonIcon from "../icons/CommonIcon";
import { BrandIcon } from "../icons/BrandIcon";
import empty_chats_icon from "../../assets/images/empty_chats.png";

const ChatEmptyStateWindow = (): ReactNode => {
  const { theme } = useTheme();
  const { chats } = useChat();
  return (
    <div
      className={`flex-1 flex items-center justify-center flex-col gap-8 ${chats.length != 0 && "max-md:hidden"} max-md:pt-20`}
    >
      {chats.length > 0 ? (
        <BrandIcon theme={theme} className="size-35" />
      ) : (
        <img
          src={empty_chats_icon}
          loading="lazy"
          alt="empty-icon"
          className="size-60 md:size-80"
        />
      )}
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-foreground-light-primary text-2xl font-semibold">
          Nothing here… yet!
        </h2>
        <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary text-center max-md:text-sm max-w-120">
          Pick a chat or Start one and make some noise
        </p>
      </div>
      <button
        type="button"
        className="w-fit gap-4 flex gradient p-2.5 px-4 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
      >
        <CommonIcon
          label="plus"
          weight="bold"
          soild={true}
          className="size-6"
        />
        <p>Start Chat</p>
      </button>
    </div>
  );
};

export default ChatEmptyStateWindow;
