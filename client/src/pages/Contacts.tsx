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
  ContactsEmptyStateScreen = React.lazy(
    () => import("../components/contacts/ContactsEmptyStateScreen"),
  );

export default function Contacts(): ReactNode {
  const { contacts } = useChat(),
    { authNUser } = useAuth(),
    { getUser } = useChat();

  const [contactEntries, setContactEntries] = useState<User[]>([]);
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
    <div className="w-full h-full text-foreground-light-secondary dark:text-foreground-dark-secondary flex max-md:flex-col relative">
      {Object.keys(contacts).length > 0 ? (
        <div className="flex-1 h-full flex items-center flex-col px-4 md:px-10 py-4 md:overflow-auto text-foreground-light-secondary dark:text-foreground-dark-secondary gap-4">
          <Suspense fallback={<Loader />}>
            <OnlineContactEntries />
          </Suspense>
          <Suspense fallback={<Loader />}>
            <ContactsFeed contactEntries={contactEntries} />
          </Suspense>
        </div>
      ) : (
        <ContactsEmptyStateScreen />
      )}
    </div>
  );
}
