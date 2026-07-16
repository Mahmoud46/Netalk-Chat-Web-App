import { useEffect, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import Label from "../components/common/Label";

import { useAuth, useChat } from "../hooks";
import { formatPhoneNumber } from "../utils/format";
import { ToggleButton } from "./AppearanceSettings";
import type { User } from "../types";
import moment from "moment";
import { BlockedCardDropList } from "../components/common/DropList";
import CommonIcon from "../components/icons/common/CommonIcon";

const BlockedUserCard = ({ user }: { user: User }) => {
  const { contacts } = useChat();
  const [isActiveCardDropList, setIsActiveCardDropList] =
    useState<boolean>(false);
  const toggleCardDropList = () => setIsActiveCardDropList((prev) => !prev);

  return (
    <div className="relative flex p-2 rounded-full justify-between items-center transition-all ease-in-out cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2">
      <BlockedCardDropList isActive={isActiveCardDropList} userId={user._id} />

      <div className="flex gap-4 flex-1">
        <div className="relative flex-none">
          {user?.isActive && (
            <span className="absolute flex items-center w-3.5 h-3.5 bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-0 right-0">
              <span className="bg-background-dark-success w-2 h-2 aspect-square rounded-full"></span>
            </span>
          )}
          <img
            src={user.profileImage ?? ""}
            alt={user.firstName}
            loading="lazy"
            className="size-9 rounded-full"
          />
        </div>
        <div className="">
          <p className="font-semibold text-base text-black dark:text-white leading-5 line-clamp-1">
            {contacts[user?._id ?? ""] ??
              `${user?.firstName} ${user?.lastName}`}
          </p>

          <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
            {user?.isActive
              ? "Active Now"
              : `Active ${moment(
                  new Date(user?.lastSeen as string),
                ).fromNow()}`}
          </p>
        </div>
      </div>

      <button
        className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        onClick={toggleCardDropList}
      >
        <CommonIcon
          label="dots_vertical_rounded"
          className="size-6"
          soild={true}
        />
        <Label text="More" />
      </button>
    </div>
  );
};

const VerificationCredentials = () => {
  const { authNUser } = useAuth();
  return (
    <div className="flex flex-col gap-4 w-full">
      {authNUser?.email && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <CommonIcon
              label="envelope_alt"
              weight="thin"
              className="size-6.5"
            />
            <p>Email</p>
          </div>
          <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-0 hover:py-2 hover:pr-2 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <p>{authNUser.email}</p>
            <button className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Change" />
            </button>
          </div>
        </div>
      )}
      {authNUser?.phoneNumber && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <CommonIcon label="phone" weight="thin" className="size-6.5" />
            <p>Phone Number</p>
          </div>
          <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-0 hover:py-2 hover:pr-2 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <p>{formatPhoneNumber(authNUser.phoneNumber)}</p>
            <button className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Change" />
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <CommonIcon label="key" weight="thin" className="size-6.5" />
          <p>Password</p>
        </div>
        <div className="relative group/data flex justify-between cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 py-0 hover:py-2 hover:pr-2 transition-all ease-in-out text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <p>*************</p>
          <button className="relative scale-0 group-hover/data:scale-100 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="edit" weight="thin" className="size-6" />
            <Label text="Change" />
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
      <p>
        Two-Factor Authentication{" "}
        <span className="opacity-50 text-xs">
          ({isActive ? "Active" : "Inactive"})
        </span>
      </p>
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
          <p>Blocked Users</p>
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
      {isActive && (
        <div className="flex flex-col mt-4">
          {blockedUsersList.map((user) => (
            <BlockedUserCard user={user} key={user._id} />
          ))}
        </div>
      )}
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
