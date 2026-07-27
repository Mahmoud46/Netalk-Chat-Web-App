import type { ReactNode } from "react";
import { useTheme } from "../../hooks";
import CommonIcon from "../icons/CommonIcon";
import { BrandIcon } from "../icons/BrandIcon";

const ChatEmptyStateWindow = (): ReactNode => {
  const { theme } = useTheme();
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-8">
      <BrandIcon theme={theme} className="size-25" />
      <div className="flex flex-col gap-1.5 items-center justify-center">
        <h2 className="text-foreground-light-primary text-xl font-semibold">
          Nothing here… yet
        </h2>
        <p className="text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          Pick a chat or Start one and make some noise
        </p>
      </div>
      <button className="relative gradient text-white flex gap-2 items-center p-2 pr-3 rounded-full cursor-pointer text-sm group transition-all ease-in-out hover:scale-105">
        <CommonIcon label="plus" soild={true} className="size-7" />
        <p>Start Chat</p>

        <CommonIcon
          label="stroke_freehand"
          className="absolute top-1/6 right-1/6 pointer-events-none size-0 group-hover:size-25 group-hover:-top-12 group-hover:pointer-events-auto group-hover:-right-10 transition-all ease-in-out"
        />
      </button>
    </div>
  );
};

export default ChatEmptyStateWindow;
