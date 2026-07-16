import { Suspense, type ReactNode } from "react";
import type { User } from "../../types";
import Label from "../common/Label";
import Loader from "../common/Loader";
import React from "react";
import CommonIcon from "../icons/common/CommonIcon";

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
  return (
    <div className="sticky top-0 w-full flex flex-col gap-3 z-1">
      <div className="gap-8 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-3 rounded-full w-full flex items-center">
        <button className="relative group p-1.5 cursor-pointer rounded-full bg-background-light-secondary dark:bg-background-dark-secondary transition-all ease-in-out hover:scale-110">
          <CommonIcon label="search" weight="thin" className="size-7" />
          <Label text="Search" />
        </button>
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
