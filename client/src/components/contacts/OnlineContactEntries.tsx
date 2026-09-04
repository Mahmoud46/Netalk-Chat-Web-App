import { Suspense, useState, type ReactNode } from "react";
import type { User } from "../../types";
import Label from "../common/Label";
import Loader from "../common/Loader";
import React from "react";
import CommonIcon from "../icons/CommonIcon";

const ContactsOnlineCard = React.lazy(() =>
  import("./ContactCard").then((module) => ({
    default: module.ContactsOnlineCard,
  })),
);

const OnlineContactEntries = ({
  onlineContactEntries,
}: {
  onlineContactEntries: User[];
}): ReactNode => {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const toggleSearchOpen = () => setSearchOpen((prev) => !prev);
  return (
    <div className="sticky top-0 w-full flex flex-col gap-3 z-1">
      <div className="gap-8 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 pl-3 rounded-full w-full flex items-center">
        <div
          className={`z-10 rounded-full transition-all ease-in-out duration-300 ${searchOpen ? "flex items-center pr-2 gap-2 bg-background-light-surface-2 dark:bg-background-dark-surface-2" : "bg-background-light-secondary dark:bg-background-dark-secondary"}`}
        >
          <button
            className={`relative group p-1.5 cursor-pointer rounded-full transition-all ease-in-out hover:scale-110`}
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
            placeholder={searchOpen ? "Search ..." : ""}
          />
        </div>
        <div className="flex items-center gap-2">
          {onlineContactEntries.map((entry) => (
            <Suspense fallback={<Loader />} key={entry._id}>
              <ContactsOnlineCard contactEntry={entry} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OnlineContactEntries;
