import { lazy, useState } from "react";
import CommonIcon from "../icons/CommonIcon";
import Label from "./Label";
import { SETTINGS_NAVIGATION_MAP } from "../../config/navigation";

const SettingsSearchDropList = lazy(() =>
  import("./DropList").then((module) => ({
    default: module.SettingsSearchDropList,
  })),
);

export const SettingsHeader = ({ title }: { title: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => {
    const search = open;
    setOpen((prev) => !prev);
    setIsActive(!search);
  };

  return (
    <div className="sticky flex-wrap top-0 w-full max-w-200 flex items-center justify-between gap-3 z-40 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 pl-3 rounded-full">
      <h1 className="text-2xl text-foreground-light-secondary dark:text-foreground-dark-secondary">
        {title}
      </h1>

      <div
        className={`rounded-full z-30 relative flex ${open ? "flex-1 items-center" : "flex-none py-0.5"} max-w-70`}
      >
        <button
          className={`${open ? "absolute opacity-50 hover:opacity-100 left-0.5" : "relative"} hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary group flex-none p-1.5 cursor-pointer rounded-full transition-all ease-in-out`}
          onClick={toggleActive}
        >
          <CommonIcon
            label={open ? "chevron_right" : "search"}
            className={`size-7 ${open && "group-hover:translate-x-1 transition-all ease-in-out"}`}
            weight="thin"
          />
          <Label text={open ? "Close" : "Search"} />
        </button>
        {open && (
          <input
            type="text"
            className="pl-11 bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
            placeholder="Search settings..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setIsActive(e.target.value.trim() != "");
            }}
          />
        )}

        <SettingsSearchDropList
          suggList={SETTINGS_NAVIGATION_MAP.filter((setting) =>
            setting.keywords.some((keyword) =>
              keyword.toLowerCase().includes(searchValue.toLowerCase().trim()),
            ),
          )}
          isActive={isActive}
        />
      </div>
    </div>
  );
};
