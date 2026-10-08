import { Suspense, useEffect, useState, type ReactNode } from "react";
import type { User } from "../../types";
import Label from "../common/Label";
import Loader from "../common/Loader";
import React from "react";
import CommonIcon from "../icons/CommonIcon";
import { useAuth, useChat } from "../../hooks";

const ContactsOnlineCard = React.lazy(() =>
  import("./ContactCard").then((module) => ({
    default: module.ContactsOnlineCard,
  })),
);

const OnlineContactEntries = ({
  isMd = false,
}: {
  isMd?: boolean;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  const toggleActive = () => setOpen((prev) => !prev);

  const { getUser, contacts } = useChat(),
    { authNUser } = useAuth();

  const [onlineContactEntries, setOnlineContactEntries] = useState<User[]>([]);

  useEffect(() => {
    const getOnlineContactEntries = async () => {
      const onlineContactEntries: User[] = [];
      if (!authNUser?.contacts) return;

      for (const contact of authNUser.contacts) {
        const contactEntry = await getUser(contact?.userId);
        if (contactEntry && contactEntry.isActive)
          onlineContactEntries.push(contactEntry);
      }

      setOnlineContactEntries(onlineContactEntries);
    };

    getOnlineContactEntries();
  }, [authNUser, authNUser?.contacts, getUser]);

  return (
    <>
      {Object.keys(contacts).length > 0 && (
        <div
          className={`sticky flex-wrap top-0 w-full max-w-200 z-40 flex ${isMd ? "md:hidden p-4 py-2" : "max-md:hidden"}`}
        >
          <div className="w-full flex flex-col gap-3 z-1 max-w-200">
            <div className="gap-8 bg-background-light-surface-3 dark:bg-background-dark-surface-3 p-1.5 rounded-full w-full flex items-center justify-between">
              <div
                className={`flex items-center gap-2 ${open && "max-md:hidden"}`}
              >
                {onlineContactEntries.slice(0, isMd ? 3 : 7).map((entry) => (
                  <Suspense fallback={<Loader />} key={entry._id}>
                    <ContactsOnlineCard contactEntry={entry} />
                  </Suspense>
                ))}

                {isMd && onlineContactEntries.length > 4 && (
                  <div className="bg-[#e11d48] dark:bg-[#7f1d1d] rounded-full h-10 w-10 flex items-center justify-center">
                    +{onlineContactEntries.length - 3}
                  </div>
                )}
              </div>
              <div className={`flex items-center ${open && "max-md:flex-1"}`}>
                <div
                  className={`rounded-full z-30 relative flex ${open ? "flex-1 items-center mr-1.5" : "flex-none py-0.5"}`}
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
                      placeholder="Search contacts..."
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="relative flex-none group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
                >
                  <CommonIcon label="plus" weight="thin" className="size-6" />
                  <Label text="Add" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OnlineContactEntries;
