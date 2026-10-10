import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { SETTINGS_SIDEBAR_ITEMS, SIDEBAR_ITEMS } from "../../config/navigation";
import {
  capitalize,
  hasCommonElement,
  isRouteActive,
} from "../../utils/helpers";
import { useAuth, useChat, useTheme } from "../../hooks";
import Label from "../common/Label";
import { MainSidebarIcon, SettingsSidebarIcon } from "../icons/SidebarIcon";
import { BrandIcon } from "../icons/BrandIcon";
import CommonIcon from "../icons/CommonIcon";

const SRTTINGS_BOTTOMBAR_LABELS_ABBS: Record<string, string> = {
  account: "Account",
  appearance: "Looks",
  "privacy & Security": "Privacy",
  language: "Language",
};

export default function Sidebar(): ReactNode {
  const pathname = useLocation().pathname,
    lastItem = SIDEBAR_ITEMS.at(-1),
    { theme } = useTheme(),
    { authNUser, logout } = useAuth(),
    { chats } = useChat(),
    isLastItemActive =
      isRouteActive(location.pathname, lastItem?.path ?? "/") &&
      location.pathname.split("/").includes(authNUser?.username ?? "");
  const totalUnreadMessages = chats
    .filter(
      (chat) =>
        !hasCommonElement(chat.participants, authNUser?.mutedUsers ?? []),
    )
    .reduce((total, current) => total + current.unreadMessages, 0);

  const isAnyItemActive =
    SIDEBAR_ITEMS.slice(0, 3).some((item) =>
      isRouteActive(pathname, item.path),
    ) || isLastItemActive;
  return (
    <aside
      className={`hidden md:flex flex-col items-center z-50 h-ful py-4 bg-background-light-surface-1 dark:bg-background-dark-surface-1 gap-8 ${isAnyItemActive ? "" : "px-1.5"}`}
    >
      <Link to="/">
        <BrandIcon className="size-8" theme={theme} />
      </Link>
      <div className="flex flex-col justify-between flex-1">
        <div className="flex flex-col items-center">
          {SIDEBAR_ITEMS.slice(0, 3).map((item) => {
            const isActive = isRouteActive(pathname, item.path),
              isInboxOrSettings =
                isRouteActive(pathname, SIDEBAR_ITEMS[0].path) ||
                isRouteActive(pathname, SIDEBAR_ITEMS[2].path),
              isEmptyInbox =
                isRouteActive(pathname, SIDEBAR_ITEMS[0].path) &&
                chats.length == 0;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative group aspect-square flex justify-center items-center p-2 rounded-full 
                  ${
                    isActive
                      ? `sidebar-element-active translate-x-7 
                    ${isInboxOrSettings ? (isEmptyInbox ? "bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115]" : "bg-background-light-surface-2 [--shadow-color:#f9f1ff] dark:bg-background-dark-surface-2 dark:[--shadow-color:#16181d]") : "bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115]"}`
                      : "hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10"
                  } transition-all ease-in-out`}
              >
                {item.label == "inbox" &&
                  totalUnreadMessages > 0 &&
                  !isActive && (
                    <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-0 -right-1 z-10">
                      {totalUnreadMessages > 99
                        ? `+${99}`
                        : totalUnreadMessages}
                    </span>
                  )}
                <div
                  className={`rounded-full ${isActive ? "p-2 bg-background-light-primary" : "p-0"}`}
                >
                  <MainSidebarIcon
                    label={item.label}
                    className="size-7"
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
            to={`${lastItem?.path ?? "/"}/${authNUser?.username}`}
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

          <button
            className="aspect-square relative group transition-all ease-in-out hover:bg-background-light-secondary/50 dark:hover:bg-background-light-secondary/10 flex justify-center items-center p-2.5 rounded-full cursor-pointer"
            onClick={logout}
          >
            <CommonIcon
              label="arrow_out_right_stroke_circle_half"
              className="size-7"
              weight="thin"
            />
            <Label text="Logout" isSide={true} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export const Bottombar = (): ReactNode => {
  const { currentParticipant, chats } = useChat(),
    { authNUser } = useAuth();
  const pathname = useLocation().pathname;
  const lastItem = SIDEBAR_ITEMS.at(-1),
    isLastItemActive =
      isRouteActive(location.pathname, lastItem?.path ?? "/") &&
      location.pathname.split("/").includes(authNUser?.username ?? "");
  const totalUnreadMessages = chats
    .filter(
      (chat) =>
        !hasCommonElement(chat.participants, authNUser?.mutedUsers ?? []),
    )
    .reduce((total, current) => total + current.unreadMessages, 0);
  return (
    <>
      {(!currentParticipant || !pathname.includes("inbox")) && (
        <div
          className={`sticky bottom-0 w-full justify-center z-50 py-2.5 hidden max-md:flex text-foreground-light-secondary dark:text-foreground-dark-secondary ${pathname.includes("inbox") && chats.length > 0 ? "bg-background-light-surface-2 dark:bg-background-dark-surface-2" : "bg-background-light-base dark:bg-background-dark-base"}`}
        >
          <div className="flex items-center justify-center rounded-3xl px-10 gap-2 w-fit bg-background-light-surface-1 dark:bg-background-dark-surface-1">
            {SIDEBAR_ITEMS.slice(0, 3).map((item) => {
              const isActive = isRouteActive(pathname, item.path);
              return (
                <Link
                  key={`bottom-${item.path}`}
                  to={item.path}
                  className={`relative aspect-square gap-2 w-15 transition-all ease-in-out flex justify-center items-center p-2 rounded-b-full flex-col ${isActive ? `-translate-y-2 ${pathname.includes("inbox") && chats.length > 0 ? "bg-background-light-surface-2 [--shadow-color:#f9f1ff] dark:bg-background-dark-surface-2 dark:[--shadow-color:#16181d]" : "bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115]"}  bottombar-element-active` : ""}`}
                >
                  {item.label == "inbox" &&
                    totalUnreadMessages > 0 &&
                    !isActive && (
                      <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-1 right-1 z-10">
                        {totalUnreadMessages > 99
                          ? `+${99}`
                          : totalUnreadMessages}
                      </span>
                    )}

                  <div
                    className={`rounded-full ${isActive ? "p-2 bg-background-light-primary" : "p-0"}`}
                  >
                    <MainSidebarIcon
                      label={item.label}
                      className="size-7"
                      isActive={isActive}
                      weight="thin"
                    />
                  </div>

                  {!isActive && (
                    <p className="text-xs">{capitalize(item.label)}</p>
                  )}
                </Link>
              );
            })}
            <Link
              to={`${lastItem?.path ?? "/"}/${authNUser?.username}`}
              className={`relative aspect-square w-15 transition-all ease-in-out flex justify-center items-center p-2 gap-2 rounded-b-full flex-col ${isLastItemActive ? "-translate-y-2 bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115] bottombar-element-active" : ""}`}
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
                <p className="text-xs">
                  {capitalize(SIDEBAR_ITEMS.at(-1)?.label ?? "")}
                </p>
              )}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export const SettingsBottombar = (): ReactNode => {
  const pathname = useLocation().pathname;
  return (
    <>
      {
        <div className="sticky bottom-0 w-full justify-center z-30 py-2.5 hidden max-md:flex text-foreground-light-secondary dark:text-foreground-dark-secondary bg-background-light-base dark:bg-background-dark-base">
          <div className="flex items-center justify-center rounded-3xl px-10 gap-2 w-fit bg-background-light-surface-1 dark:bg-background-dark-surface-1">
            {SETTINGS_SIDEBAR_ITEMS.map((item) => {
              const isActive = isRouteActive(pathname, item.path);
              return (
                <Link
                  key={`bottom-${item.path}`}
                  to={item.path}
                  className={`relative aspect-square w-15 transition-all ease-in-out gap-2 flex justify-center items-center p-2 rounded-b-full flex-col ${isActive ? "-translate-y-2 bg-background-light-base [--shadow-color:#fff] dark:bg-background-dark-base dark:[--shadow-color:#0f1115] bottombar-element-active" : ""}`}
                >
                  <div
                    className={`rounded-full  ${isActive ? "p-2 bg-background-light-primary" : "p-0"}`}
                  >
                    <SettingsSidebarIcon
                      label={item.label}
                      className="size-7"
                      isActive={isActive}
                      weight="thin"
                    />
                  </div>

                  {!isActive && (
                    <p className="text-xs line-clamp-1">
                      {SRTTINGS_BOTTOMBAR_LABELS_ABBS[item.label]}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      }
    </>
  );
};
