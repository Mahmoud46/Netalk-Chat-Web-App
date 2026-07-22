import { type ReactNode } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowIcon } from "../components/ui/Icons";
import Label from "../components/common/Label";
import { SETTINGS_SIDEBAR_ITEMS } from "../config/navigation";
import { capitalize, isRouteActive } from "../utils/helpers";
import { SettingsSidebarIcon } from "../components/icons/sidebar/SidebarIcon";
import CommonIcon from "../components/icons/common/CommonIcon";

const SettingsSidebar = (): ReactNode => {
  const pathname = useLocation().pathname;
  return (
    <aside className="min-w-20 h-dvh bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 pl-10 flex flex-col items-center gap-4">
      <button className="relative bg-background-light-base dark:bg-background-dark-base -translate-y-2 translate-x-2 p-1 rounded-bl-3xl cursor-pointer group top-right-cornered-toggle-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115] self-end">
        <ArrowIcon className="size-7 transition-all ease-in-out group-hover:translate-x-4 translate-x-2" />
      </button>
      <button className="relative group p-1.5 cursor-pointer rounded-full bg-background-light-secondary dark:bg-background-dark-secondary transition-all ease-in-out hover:scale-110">
        <CommonIcon label="search" className="size-7" weight="thin" />
        <Label text="Search" isSide={true} />
      </button>
      <div className="flex flex-col items-center flex-1">
        {SETTINGS_SIDEBAR_ITEMS.map((item) => {
          const isActive = isRouteActive(pathname, item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group aspect-square flex justify-center items-center p-2 rounded-full 
                  ${
                    isActive
                      ? `sidebar-element-active translate-x-9 bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115]`
                      : "hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10"
                  } transition-all ease-in-out`}
            >
              <div
                className={`rounded-full ${isActive ? "p-2 bg-background-light-primary" : "p-0"}`}
              >
                <SettingsSidebarIcon
                  label={item.label}
                  isActive={isActive}
                  className="size-7"
                  weight="thin"
                />
              </div>
              {!isActive && (
                <Label text={capitalize(item.label)} isSide={true} />
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default function Settings(): ReactNode {
  return (
    <div className="h-full w-full flex">
      <SettingsSidebar />
      <div className="flex-1 h-full flex items-center flex-col px-10 py-4 overflow-auto dark:text-foreground-dark-secondary gap-4 scrollbar-thin mr-2">
        <Outlet />
      </div>
    </div>
  );
}
