import type { ReactNode } from "react";
import React, { Suspense } from "react";
import Loader from "../components/common/Loader";
import { Outlet, useLocation } from "react-router-dom";
import { useChat } from "../hooks";
const Sidebar = React.lazy(() => import("../components/layout/Sidebar"));
const Bottombar = React.lazy(() =>
  import("../components/layout/Sidebar").then((module) => ({
    default: module.Bottombar,
  })),
);
const SettingsBottombar = React.lazy(() =>
  import("../components/layout/Sidebar").then((module) => ({
    default: module.SettingsBottombar,
  })),
);
const SettingsHeader = React.lazy(() =>
  import("../components/common/Header").then((module) => ({
    default: module.SettingsHeader,
  })),
);
const OnlineContactEntries = React.lazy(
  () => import("../components/contacts/OnlineContactEntries"),
);

export default function User(): ReactNode {
  const { currentParticipant } = useChat(),
    pathname = useLocation().pathname;
  return (
    <section
      className={`flex relative ${(!currentParticipant || !pathname.includes("/inbox")) && "max-md:flex-col"} min-h-dvh bg-background-light-base dark:bg-background-dark-base`}
    >
      {pathname.includes("/settings") && (
        <Suspense fallback={<Loader />}>
          <SettingsHeader isMd={true} />
        </Suspense>
      )}
      {pathname.includes("/contacts") && (
        <Suspense fallback={<Loader />}>
          <OnlineContactEntries isMd={true} />
        </Suspense>
      )}
      <Suspense fallback={<Loader />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div className="md:max-h-dvh overflow-auto flex-1">
          <Outlet />
        </div>
      </Suspense>
      <Suspense fallback={<Loader />}>
        {pathname.includes("/settings") ? <SettingsBottombar /> : <Bottombar />}
      </Suspense>
    </section>
  );
}
