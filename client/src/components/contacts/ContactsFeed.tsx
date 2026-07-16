import { Suspense, useEffect, useState, type ReactNode } from "react";
import Loader from "../common/Loader";
import React from "react";
import { groupContactEntriesByFirstLetter } from "../../utils/helpers";
import { useChat } from "../../hooks";
import type { User } from "../../types";

const ContactCard = React.lazy(() =>
  import("./ContactCard").then((module) => ({
    default: module.ContactCard,
  })),
);

const AlphabetIndexer = ({
  indexedContactEntries,
}: {
  indexedContactEntries: Record<string, User[]>;
}): ReactNode => {
  return (
    <div className="text-sm h-fit sticky top-1/2 -translate-y-1/2 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 rounded-full text-center flex flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary max-h-700 overflow-auto">
      {Object.entries(indexedContactEntries).map((alphabet) => (
        <a
          href={`#${alphabet[0]}`}
          key={alphabet[0]}
          className="transition-all ease-in-out aspect-square w-8 flex items-center justify-center hover:bg-background-light-surface-3 dark:hover:bg-background-dark-surface-3 rounded-full flex-none"
        >
          {alphabet[0]}
        </a>
      ))}
    </div>
  );
};

const ContactsFeed = ({ contactEntries }: { contactEntries: User[] }) => {
  const { contacts } = useChat();
  const [indexedContactEntries, setIndexedContactEntries] = useState<
    Record<string, User[]>
  >({});

  useEffect(() => {
    const mapContactEntries = async () => {
      const indexedContactEntries: Record<string, User[]> =
        groupContactEntriesByFirstLetter(contactEntries, contacts);

      if (indexedContactEntries)
        setIndexedContactEntries(indexedContactEntries);
    };

    mapContactEntries();
  }, [contactEntries]);

  return (
    <>
      {Object.keys(indexedContactEntries).length > 0 && (
        <div className="flex-1 w-full flex gap-4 relative">
          <AlphabetIndexer indexedContactEntries={indexedContactEntries} />
          <div className="flex gap-4 items-start flex-col">
            {Object.entries(indexedContactEntries).map(([letter, entries]) => (
              <div key={`c-${letter}`} id={letter} className="flex gap-4">
                {entries.map((entry) => (
                  <Suspense fallback={<Loader />} key={entry._id}>
                    <ContactCard contactEntry={entry} />
                  </Suspense>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ContactsFeed;
