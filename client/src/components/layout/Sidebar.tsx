import type { ReactNode } from "react";
import { NetalkIcon } from "../ui/Icons";
import { Link, useLocation } from "react-router-dom";
import { SIDEBAR_ITEMS } from "../../config/navigation";
import { capitalize, isRouteActive } from "../../utils/helpers";
import { useAuth, useTheme } from "../../hooks";
import Label from "../common/Label";
import { MainSidebarIcon } from "../icons/Sidebar/SidebarIcon";

export default function Sidebar(): ReactNode {
  const pathname = useLocation().pathname,
    lastItem = SIDEBAR_ITEMS.at(-1),
    isLastItemActive = isRouteActive(location.pathname, lastItem?.path ?? "/"),
    { theme } = useTheme(),
    { authNUser } = useAuth();
  return (
    <aside className="flex flex-col items-center h-ful py-4 bg-background-light-surface-1 dark:bg-background-dark-surface-1 gap-8">
      <Link to="/">
        <NetalkIcon className="size-8" theme={theme} />
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col items-center">
          {SIDEBAR_ITEMS.slice(0, 4).map((item) => {
            const isActive = isRouteActive(pathname, item.path),
              isInboxOrArchive =
                isRouteActive(pathname, SIDEBAR_ITEMS[0].path) ||
                isRouteActive(pathname, SIDEBAR_ITEMS[2].path) ||
                isRouteActive(pathname, SIDEBAR_ITEMS[3].path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group aspect-square flex justify-center items-center p-2 rounded-full 
                  ${
                    isActive
                      ? `sidebar-element-active translate-x-7 
                    ${isInboxOrArchive ? "bg-background-light-surface-2 [--shadow-color:#f9f1ff] dark:bg-background-dark-surface-2 dark:[--shadow-color:#16181d]" : "bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115]"}`
                      : "hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10"
                  } transition-all ease-in-out`}
              >
                <div
                  className={`rounded-full ${isActive ? "p-2 bg-background-light-primary" : "p-0"}`}
                >
                  <MainSidebarIcon
                    label={item.label}
                    className="w-7"
                    isActive={isActive}
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
        <div className="flex flex-col items-center">
          <Link
            to={lastItem?.path ?? "/"}
            className={`relative group aspect-square flex justify-center items-center p-2 rounded-full ${isLastItemActive ? `sidebar-element-active [--shadow-color:#fff] translate-x-7 bg-background-light-base dark:bg-background-dark-base dark:[--shadow-color:#0f1115]` : "hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10"} transition-all ease-in-out`}
          >
            <div
              className={`rounded-full ${isLastItemActive ? "p-2 bg-background-light-surface-1 dark:bg-background-dark-surface-1" : "p-0"}`}
            >
              <img
                src={authNUser?.profileImage}
                alt={authNUser?.firstName}
                loading="lazy"
                className={`rounded-full size-7`}
              />
            </div>
            {!isLastItemActive && (
              <Label
                text={capitalize(authNUser?.firstName ?? "")}
                isSide={true}
              />
            )}
          </Link>

          <button className="aspect-square relative group transition-all ease-in-out hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10 flex justify-center items-center p-2.5 rounded-full cursor-pointer">
            <MainSidebarIcon className="size-7" weight="thin" />
            <Label text="Logout" isSide={true} />
          </button>
        </div>
      </div>
    </aside>
  );
}
