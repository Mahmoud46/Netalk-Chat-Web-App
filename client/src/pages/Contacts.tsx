import { Suspense, useEffect, useState, type ReactNode } from "react";
import { useAuth, useChat } from "../hooks";
import type { User } from "../types";

import React from "react";
import Loader from "../components/common/Loader";

const OnlineContactEntries = React.lazy(
    () => import("../components/contacts/OnlineContactEntries"),
  ),
  ContactsFeed = React.lazy(
    () => import("../components/contacts/ContactsFeed"),
  ),
  SideProfilePanel = React.lazy(
    () => import("../components/chat/SideProfilePanel"),
  );

export default function Contacts(): ReactNode {
  const { currentContactEntry, contacts, setCurrentContactEntry } = useChat(),
    { authNUser } = useAuth(),
    { getUser } = useChat();

  const [contactEntries, setContactEntries] = useState<User[]>([]);
  const toggleButtonClickAction = () => setCurrentContactEntry(null);
  useEffect(() => {
    const getContactEntries = async () => {
      const contactEntries: User[] = [];
      if (!authNUser?.contacts) return;

      for (const contact of authNUser.contacts) {
        const contactEntry = await getUser(contact?.userId);
        if (contactEntry) contactEntries.push(contactEntry);
      }

      setContactEntries(contactEntries);
    };

    getContactEntries();
  }, []);

  return (
    <div className="h-full w-full flex">
      <div className="flex-1 h-full flex items-center flex-col px-10 py-4 overflow-auto dark:text-foreground-dark-secondary gap-4 scrollbar-thin mr-2">
        <Suspense fallback={<Loader />}>
          <OnlineContactEntries
            onlineContactEntries={contactEntries.filter(
              (entry) => entry.isActive,
            )}
          />
        </Suspense>
        <Suspense fallback={<Loader />}>
          <ContactsFeed contactEntries={contactEntries} />
        </Suspense>
      </div>

      {currentContactEntry && (
        <Suspense fallback={<Loader />}>
          <SideProfilePanel
            user={currentContactEntry}
            contacts={contacts}
            isContactPanel={true}
            toggleButtonClickAction={toggleButtonClickAction}
          />
        </Suspense>
      )}
    </div>
  );
}
