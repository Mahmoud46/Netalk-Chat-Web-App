import type { ReactNode } from "react";
import React, { Suspense } from "react";
import Loader from "../components/common/Loader";
import { Outlet } from "react-router-dom";
const Sidebar = React.lazy(() => import("../components/layout/Sidebar"));

export default function User(): ReactNode {
  return (
    <section className="flex min-h-dvh bg-background-light-base dark:bg-background-dark-base">
      <Suspense fallback={<Loader />}>
        <Sidebar />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div className="max-h-dvh overflow-auto flex-1">
          <Outlet />
        </div>
      </Suspense>
    </section>
  );
}
