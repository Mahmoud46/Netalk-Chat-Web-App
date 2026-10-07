import { useEffect, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import { useTheme } from "../hooks";
import CommonIcon from "../components/icons/CommonIcon";

export const ToggleButton = ({
  isActive = false,
  action,
}: {
  isActive?: boolean;
  action: () => void;
}) => (
  <div
    className={`cursor-pointer w-11 h-6 flex items-center p-0.5 rounded-full transition-all ease-in-out ${isActive ? "bg-background-light-primary dark:bg-background-dark-primary" : "bg-background-light-surface-2 dark:bg-background-dark-surface-2"}`}
    onClick={action}
  >
    <div
      className={`aspect-square h-5 rounded-full transition-all ease-in-out ${isActive ? "translate-x-5 bg-white" : "bg-foreground-dark-secondary/50 dark:bg-foreground-dark-secondary/50"}`}
    ></div>
  </div>
);

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    const checkTheme = async () => setIsActive(theme == "dark");

    checkTheme();
  }, [theme]);

  return (
    <div className="flex font-semibold items-center justify-between text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <label htmlFor="theme" className="cursor-pointer flex-1">
        Dark Theme{" "}
        <span className="opacity-50 text-xs">
          ({isActive ? "Active" : "Inactive"})
        </span>
      </label>
      <input
        type="checkbox"
        name="theme"
        id="theme"
        className="absolute right-0 opacity-0 cursor-pointer"
        onChange={toggleTheme}
        checked={isActive}
      />
      <ToggleButton isActive={isActive} action={toggleTheme} />
    </div>
  );
};

const MessageFontSize = () => {
  const { messageFontSize, changeMessageFontSize } = useTheme();
  const fontSizes = Array.from({ length: 10 }, (_, i) => 12 + i * 2);
  return (
    <div className="flex flex-col text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <div className="flex font-semibold justify-center text-sm flex-col gap-2">
        <div className="flex font-semibold gap-2 items-center text-sm justify-start text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <CommonIcon label="text_width" weight="thin" className="size-6.5" />
          <p>
            Font size{" "}
            <span className="opacity-50 text-xs text">
              ({messageFontSize} px)
            </span>
          </p>
        </div>
        <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary text-xs font-normal">
          Adjust the font size of messages in your conversations. Larger text
          makes messages easier to read, while smaller text lets you see more
          messages on the screen at once. This setting affects message text
          across all your chats.
        </p>
        <div className="flex flex-col gap-8 relative w-full self-end pl-1.5 pr-3.5 mt-3">
          {/* Progress bar */}
          <div className="relative h-6 rounded-3xl bg-background-light-surface-2 dark:bg-background-dark-surface-2">
            <div className="flex absolute font-light w-full z-20 opacity-70 pointer-events-none">
              {fontSizes.map((size) => (
                <span
                  key={size}
                  className="flex flex-col items-start text-sm flex-1 absolute"
                  style={{
                    left: `${((size - 12) / (30 - 12)) * 100}%`,
                  }}
                >
                  |{" "}
                  <i className="text-[10px] not-italic mt-2 -translate-x-2">
                    {size}px
                  </i>
                </span>
              ))}
            </div>
            <div
              className={`h-full absolute bg-background-dark-primary transition-all ease-in-out rounded-l-3xl ${messageFontSize == 30 && "rounded-r-3xl"}`}
              style={{
                width: `${((messageFontSize - 12) / (30 - 12)) * 100}%`,
              }}
            ></div>
          </div>
          <input
            type="range"
            value={messageFontSize}
            onChange={(e) => changeMessageFontSize(parseInt(e.target.value))}
            min={12}
            step={2}
            max={30}
            className="absolute accent-red-950 z-30 h-full w-full opacity-0 cursor-pointer"
          />
        </div>
      </div>
      <p
        className="line-clamp-1 mt-8"
        style={{ fontSize: `${messageFontSize}px` }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia,
        doloremque! Ipsam, doloribus nobis quia facere enim corporis eligendi ex
        eaque esse deserunt aliquid molestias harum ratione autem commodi error
        assumenda.
      </p>
    </div>
  );
};

export default function AppearanceSettings() {
  return (
    <>
      <SettingsHeader />

      <div className="flex items-start justify-start flex-wrap w-full gap-6 max-w-200">
        <div className="flex-1 flex flex-col gap-4 min-w-80">
          <DarkModeToggle />
        </div>
        <div className="flex-1 flex flex-col gap-4 min-w-80">
          <MessageFontSize />
        </div>
      </div>
    </>
  );
}
