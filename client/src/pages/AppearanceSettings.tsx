import { useEffect, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import { useTheme } from "../hooks";

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
    <div className="mt-4 flex flex-col text-sm gap-8 text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <div className="flex font-semibold items-center justify-between text-sm flex-wrap">
        <p>
          Font size{" "}
          <span className="opacity-50 text-xs text">
            ({messageFontSize} px)
          </span>
        </p>
        <div className="flex flex-col gap-8 flex-1 relative max-w-80">
          {/* Progress bar */}
          <div className="relative w-full h-6 rounded-3xl bg-background-light-surface-2 dark:bg-background-dark-surface-2">
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
      <p className="line-clamp-1" style={{ fontSize: `${messageFontSize}px` }}>
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
      <SettingsHeader title="Appearance Settings" />

      <div className="flex items-start justify-start flex-wrap w-full px-3 gap-6">
        <div className="flex-1 flex flex-col gap-4">
          <DarkModeToggle />
          <MessageFontSize />
        </div>
        <div className="flex-1"></div>
      </div>
    </>
  );
}
