import { lazy, useState } from "react";
import CommonIcon from "../icons/CommonIcon";
import Label from "./Label";
import { SETTINGS_NAVIGATION_MAP } from "../../config/navigation";
import { Link, useLocation } from "react-router-dom";

const SettingsSearchDropList = lazy(() =>
  import("./DropList").then((module) => ({
    default: module.SettingsSearchDropList,
  })),
);

const settingsTitleMap = (pathname: string): string => {
  if (pathname.includes("/settings/account")) return "Account Settings";
  else if (pathname.includes("/settings/appearance"))
    return "Appearance Settings";
  else if (pathname.includes("/settings/privacy-security"))
    return "Privacy & Security Settings";
  else if (pathname.includes("/settings/language")) return "Language Settings";
  else return "";
};

export const SettingsHeader = ({ isMd = false }: { isMd?: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleActive = () => {
    const search = open;
    setOpen((prev) => !prev);
    setIsActive(!search);
  };
  const pathname = useLocation().pathname;

  return (
    <div
      className={`sticky top-0 w-full max-w-200 z-40 flex rounded-3xl ${isMd ? "md:hidden p-4 py-2" : "max-md:hidden"}`}
    >
      <div
        className={`flex items-center w-full justify-start md:justify-between gap-3 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 pl-3 rounded-full`}
      >
        {isMd && (
          <Link
            to={"/app"}
            className="relative flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-7 transition-all ease-in-out rotate-180`}
            />
            <Label text="Back" />
          </Link>
        )}
        <h1
          className={`text-xl max-md:flex-1 md:text-2xl text-foreground-light-secondary dark:text-foreground-dark-secondary line-clamp-1 ${open && "max-md:hidden"}`}
        >
          {settingsTitleMap(pathname)}
        </h1>

        <div
          className={`rounded-full z-30 relative flex items-center flex-wrap ${open ? "flex-1" : "flex-none py-0.5"} md:max-w-70 min-w-0`}
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
              className="pl-11 shrink bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
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
                keyword
                  .toLowerCase()
                  .includes(searchValue.toLowerCase().trim()),
              ),
            )}
            isActive={isActive}
            setIsActive={setIsActive}
            setOpen={setOpen}
          />
        </div>
      </div>
    </div>
  );
};
