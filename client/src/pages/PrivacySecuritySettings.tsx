import { lazy, useEffect, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import Label from "../components/common/Label";

import { useAuth, useChat } from "../hooks";
import { formatPhoneNumber } from "../utils/format";
import { ToggleButton } from "./AppearanceSettings";
import type { User } from "../types";

import CommonIcon from "../components/icons/CommonIcon";

const BlockedUsersDropList = lazy(() =>
  import("../components/common/DropList").then((module) => ({
    default: module.BlockedUsersDropList,
  })),
);

const VerificationCredentials = () => {
  const { authNUser } = useAuth();
  return (
    <div className="flex flex-col gap-4 w-full">
      {authNUser?.email && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <p>Email</p>
          </div>
          <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-1 pr-1 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <CommonIcon
              label="envelope_alt"
              weight="thin"
              className="size-6 flex-none"
            />
            <input
              type="email"
              name="email-address"
              id="email-address"
              value={authNUser.email}
              className="h-full flex-1 outline-none cursor-pointer"
              readOnly
            />
            <button className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Edit" />
            </button>
          </div>
        </div>
      )}
      {authNUser?.phoneNumber && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <p>Phone Number</p>
          </div>
          <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-1 pr-1 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <CommonIcon
              label="phone"
              weight="thin"
              className="size-6 flex-none"
            />

            <input
              type="tel"
              name="phone-number"
              id="phone-number"
              value={formatPhoneNumber(authNUser.phoneNumber)}
              className="h-full flex-1 outline-none cursor-pointer"
              readOnly
            />

            <button className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Edit" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <p>Password</p>
        </div>
        <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-1 pr-1 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <CommonIcon label="key" weight="thin" className="size-6 flex-none" />
          <input
            type="password"
            name="password"
            id="password"
            value={"hello to netalk"}
            className="h-full flex-1 outline-none text-base cursor-pointer"
            readOnly
          />

          <button
            type="button"
            className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon label="edit" weight="thin" className="size-6" />
            <Label text="Edit" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TwoFactorAuthentication = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggle2FA = () => setIsActive((prev) => !prev);
  return (
    <div className="flex font-semibold items-center justify-between text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <label htmlFor="two-factor-auth" className="cursor-pointer flex-1">
        Two-Factor Authentication{" "}
        <span className="opacity-50 text-xs">
          ({isActive ? "Active" : "Inactive"})
        </span>
      </label>
      <input
        type="checkbox"
        name="two-factor-auth"
        id="two-factor-auth"
        className="absolute right-0 opacity-0 cursor-pointer"
        onChange={toggle2FA}
        checked={isActive}
      />
      <ToggleButton isActive={isActive} action={toggle2FA} />
    </div>
  );
};

const BlockedUsers = () => {
  const { authNUser } = useAuth();
  const { getUser } = useChat();
  const [blockedUsersList, setBlockedUsersList] = useState<User[]>([]),
    [isActive, setIsActive] = useState<boolean>(false);

  const toggleBlockedUsersList = () => setIsActive((prev) => !prev);

  useEffect(() => {
    const getBlockedUsers = async () => {
      const blockedUsers: User[] = [];
      if (!authNUser?.blockedUsers) return;
      for (const userId of authNUser?.blockedUsers ?? []) {
        const user = await getUser(userId as string);

        if (user) blockedUsers.push(user);
      }

      setBlockedUsersList(blockedUsers);
    };

    getBlockedUsers();
  }, []);
  return (
    <>
      <div className="flex gap-2 items-center text-sm justify-between text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-danger dark:text-foreground-dark-danger">
          <CommonIcon label="user_x" weight="thin" className="size-6.5" />
          <p>
            Blocked Users{" "}
            {blockedUsersList.length > 0 && (
              <span className="opacity-50 text-xs ml-2">
                ({blockedUsersList.length})
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center">
          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="plus" weight="thin" className="size-6" />
            <Label text="Add" />
          </button>
          {blockedUsersList.length > 0 && (
            <button
              className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              onClick={toggleBlockedUsersList}
            >
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 transition-all ease-in-out ${isActive ? "-rotate-90" : "rotate-90"}`}
              />
              <Label text={isActive ? "Close" : "Open"} />
            </button>
          )}
        </div>
      </div>

      <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary text-xs">
        Blocked users can't send you messages or add you to groups. They will
        not see your profile photos, stories, online and last seen status.
      </p>
      <div className="relative w-full h-80">
        <BlockedUsersDropList
          isActive={isActive}
          blockedUsersList={blockedUsersList}
        />
      </div>
    </>
  );
};

export default function PrivacySecuritySettings() {
  return (
    <>
      <SettingsHeader title="Privacy & Security Settings" />

      <div className="flex flex-wrap w-full px-3 gap-6">
        <div className="flex flex-col flex-1 gap-6">
          <VerificationCredentials />
          <TwoFactorAuthentication />
        </div>
        <div className="flex-1 flex flex-col">
          <BlockedUsers />
        </div>
      </div>
    </>
  );
}
