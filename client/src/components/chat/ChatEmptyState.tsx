import type { ReactNode } from "react";
import { useTheme } from "../../hooks";
import CommonIcon from "../icons/CommonIcon";
import { BrandIcon } from "../icons/BrandIcon";

const ChatEmptyStateWindow = (): ReactNode => {
  const { theme } = useTheme();
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-8">
      <BrandIcon theme={theme} className="size-35" />
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-foreground-light-primary text-2xl font-semibold">
          Nothing here… yet!
        </h2>
        <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary">
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
