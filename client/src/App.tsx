import React, { Suspense, type ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { useAuth } from "./hooks";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import Loader from "./components/common/Loader";
const User = React.lazy(() => import("./pages/User"));
const Auth = React.lazy(() => import("./pages/Auth"));
const Inbox = React.lazy(() => import("./pages/Inbox"));
const Contacts = React.lazy(() => import("./pages/Contacts"));
const Archive = React.lazy(() => import("./pages/Archive"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Profile = React.lazy(() => import("./pages/Profile"));
const AccountSettings = React.lazy(() => import("./pages/AccountSettings"));
const AppearanceSettings = React.lazy(
  () => import("./pages/AppearanceSettings"),
);
const PrivacySecuritySettings = React.lazy(
  () => import("./pages/PrivacySecuritySettings"),
);
const LanguageSettings = React.lazy(
  () => import("./pages/Settings/LanguageSettings"),
);

export default function App(): ReactNode {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route index element={<Navigate to={"/app"} />} />
        <Route
          path="/app/"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to={"/app/inbox"} />} />
          <Route
            path="inbox"
            element={
              <Suspense fallback={<Loader />}>
                <Inbox />
              </Suspense>
            }
          />
          <Route
            path="inbox/:id"
            element={
              <Suspense fallback={<Loader />}>
                <Inbox />
              </Suspense>
            }
          />
          <Route
            path="contacts"
            element={
              <Suspense fallback={<Loader />}>
                <Contacts />
              </Suspense>
            }
          />
          <Route
            path="archive"
            element={
              <Suspense fallback={<Loader />}>
                <Archive />
              </Suspense>
            }
          />
          <Route
            path="archive/:id"
            element={
              <Suspense fallback={<Loader />}>
                <Archive />
              </Suspense>
            }
          />

          <Route
            path="settings"
            element={
              <Suspense fallback={<Loader />}>
                <Settings />
              </Suspense>
            }
          >
            <Route index element={<Navigate to={"/app/settings/account"} />} />
            <Route
              path="account"
              element={
                <Suspense fallback={<Loader />}>
                  <AccountSettings />
                </Suspense>
              }
            />
            <Route
              path="appearance"
              element={
                <Suspense fallback={<Loader />}>
                  <AppearanceSettings />
                </Suspense>
              }
            />
            <Route
              path="privacy-security"
              element={
                <Suspense fallback={<Loader />}>
                  <PrivacySecuritySettings />
                </Suspense>
              }
            />
            <Route
              path="language"
              element={
                <Suspense fallback={<Loader />}>
                  <LanguageSettings />
                </Suspense>
              }
            />
          </Route>
          <Route
            path="profile/:username"
            element={
              <Suspense fallback={<Loader />}>
                <Profile />
              </Suspense>
            }
          />
        </Route>

        <Route
          path="/auth/"
          element={
            isAuthenticated ? (
              <Navigate to={"/"} />
            ) : (
              <Suspense fallback={<Loader />}>
                <Auth />
              </Suspense>
            )
          }
        />
      </Routes>
    </>
  );
}
