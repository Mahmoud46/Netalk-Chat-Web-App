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
          className={`z-10 bg-background-light-secondary dark:bg-background-dark-secondary rounded-full flex ${searchOpen ? "items-center pr-2" : ""}`}
        >
          <button
            className={`relative group p-1.5 cursor-pointer rounded-full bg-background-light-secondary dark:bg-background-dark-secondary transition-all ease-in-out ${searchOpen ? "" : "hover:scale-110"}`}
            onClick={toggleSearchOpen}
          >
            <CommonIcon
              label={searchOpen ? "search_x" : "search"}
              className="size-7"
              weight="thin"
            />
            <Label text={searchOpen ? "Close" : "Search"} isSide={true} />
          </button>
          {searchOpen && (
            <input
              type="text"
              className="flex-1 bg-transparent text-sm h-full outline-none min-w-60 text-foreground-light-secondary dark:text-foreground-dark-secondary"
              placeholder="Search ..."
            />
          )}
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
