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
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const toggleSearchOpen = () => {
    setSearchOpen((prev) => !prev);
    setIsActive(false);
  };
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="sticky top-0 w-full flex items-center justify-between gap-3 z-40 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 pl-3 rounded-full">
      <h1 className="text-2xl">{title}</h1>

      <div
        className={`z-10 relative rounded-full transition-all ease-in-out duration-300 ${searchOpen ? "flex items-center pr-2 gap-2 bg-background-light-surface-2 dark:bg-background-dark-surface-2" : "bg-background-light-secondary dark:bg-background-dark-secondary"}`}
      >
        <button
          className={`relative group p-1.5 cursor-pointer rounded-full bg-background-light-secondary dark:bg-background-dark-secondary transition-all ease-in-out hover:scale-110`}
          onClick={toggleSearchOpen}
        >
          <CommonIcon
            label={searchOpen ? "search_x" : "search"}
            className="size-7"
            weight="thin"
          />
          <Label text={searchOpen ? "Close" : "Search"} />
        </button>
        <input
          type="text"
          className={`flex-1 text-sm outline-none text-foreground-light-secondary dark:text-foreground-dark-secondary transition-all ease-in-out ${searchOpen ? "max-w-80 min-w-60 leading-8" : "max-w-0 min-w-0"}`}
          placeholder="Search ..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
            setIsActive(e.target.value.trim() != "");
          }}
        />
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
