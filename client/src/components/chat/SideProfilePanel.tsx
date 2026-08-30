import type { ReactNode } from "react";
import { useAuth, useTheme } from "../../hooks";
import Label from "../common/Label";

import { lazy, Suspense } from "react";

import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../icons/CommonIcon";

import { UsernameHolder } from "../../pages/Profile";
import Loader from "../common/Loader";
import type { Chat, ThemeMode, User } from "../../types";

const ProfilePanelContactInfo = lazy(() =>
  import("../layout/Snap").then((module) => ({
    default: module.ProfilePanelContactInfo,
  })),
);

const SharedMedia = lazy(() =>
    import("../layout/Snap").then((module) => ({
      default: module.SharedMedia,
    })),
  ),
  SharedFiles = lazy(() =>
    import("../layout/Snap").then((module) => ({
      default: module.SharedFiles,
    })),
  );

const ClampText = lazy(() => import("../common/ClampText"));

const ProfilePanelHeader = ({
  user,
  theme,
  toggleButtonClickAction = () => {},
}: {
  user: User | null;
  theme: ThemeMode;
  toggleButtonClickAction?: () => void;
}) => {
  return (
    <div className="relative flex flex-col">
      {/* Close buttoon */}
      <div className="absolute top-0 left-0 bg-background-light-base dark:bg-background-dark-base p-2 rounded-br-3xl top-left-cornered-btn  [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        <button
          className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          onClick={toggleButtonClickAction}
        >
          <CommonIcon
            label="chevron_right"
            weight="thin"
            className="size-7 transition-all ease-in-out"
          />
          <Label text="Close" />
        </button>
      </div>
      <img
        src={
          user?.profileCover ??
          (theme == "dark" ? default_cover_dark : default_cover)
        }
        alt="participant-profile-cover"
        loading="lazy"
        className="w-full rounded-b-3xl"
      />

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 rounded-full">
        {user?.profileImage && (
          <img
            src={user?.profileImage}
            alt="profile-image"
            loading="lazy"
            className="size-22 rounded-full"
          />
        )}
        {user?.isActive && (
          <span className="absolute flex items-center p-1.5 aspect-square bg-background-light-surface-2 dark:bg-background-dark-surface-2 justify-center rounded-full bottom-1 right-1">
            <span className="bg-background-dark-success size-4 aspect-square rounded-full"></span>
          </span>
        )}
      </div>
    </div>
  );
};

const ProfilePanelMainInfo = ({
  user,
  contacts,
}: {
  user: User | null;
  contacts: Record<string, string>;
}) => {
  return (
    <div className="flex flex-col justify-center p-4 pt-2 mt-11 mb-2 gap-2 items-center">
      <UsernameHolder username={user?.username} isXs={true} />
      <div className="space-y-1">
        <ClampText
          text={
            contacts[user?._id ?? ""] ?? `${user?.firstName} ${user?.lastName}`
          }
          className="text-center font-semibold text-lg text-foreground-light-secondary dark:text-foreground-dark-secondary"
        />
        {user?.title && (
          <ClampText
            text={user.title}
            className="relative cursor-pointer text-center text-base text-foreground-light-secondary dark:text-foreground-dark-secondary"
          />
        )}
        {user?.address && (
          <div className="text-sm flex items-center gap-2 justify-center text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <CommonIcon label="location_alt" weight="thin" className="size-5" />
            {user?.address}
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePanelControlButtons = ({
  isContact,
  isMuted,
  isBlocked,
}: {
  isContact: boolean;
  isMuted: boolean;
  isBlocked: boolean;
}) => {
  return (
    <div className="bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-t-3xl flex flex-col transition-all ease-in-out">
      <div className="flex items-center -translate-y-3 w-fit bg-background-light-surface-2 dark:bg-background-dark-surface-2 self-center p-2 pt-0 rounded-b-3xl relative profile-main-buttons-container [--shadow-color:#f9f1ff] dark:[--shadow-color:#16181d]">
        {isContact && (
          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="edit" weight="thin" className="size-6.5" />
            <Label text="Edit" />
          </button>
        )}
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon
            label={isContact ? "user_minus" : "user_plus"}
            weight="thin"
            className="size-6.5"
          />
          <Label text={isContact ? "Delete" : "Add"} />
        </button>
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon
            label={isMuted ? "bell" : "bell_slash"}
            weight="thin"
            className="size-6.5"
          />
          <Label text={isMuted ? "Unmute" : "Mute"} />
        </button>
        <button
          className={`relative group cursor-pointer p-2 rounded-full ${isBlocked ? "hover:bg-green-400/10 dark:hover:bg-green-700/20" : "hover:bg-background-light-danger dark:hover:bg-background-dark-danger"} transition-all ease-in-out`}
        >
          <CommonIcon
            label={isBlocked ? "" : "user_x"}
            weight="thin"
            className="size-6.5"
          />
          <Label text={isBlocked ? "Unblock" : "Block"} />
        </button>
      </div>
    </div>
  );
};

const ProfilePanelMinorInfo = ({
  user,
  currentChat,
  isContactPanel = false,
}: {
  user: User | null;
  currentChat: Chat | null;
  isContactPanel?: boolean;
}) => {
  return (
    <div className="flex-1 overflow-auto stable-gutter-container bg-background-light-surface-3 dark:bg-background-dark-surface-3 flex flex-col transition-all ease-in-out">
      <div className="h-full stable-gutter-container overflow-y-auto px-3 py-3 pt-0 flex flex-col gap-6">
        {user?.bio && (
          <div className="flex gap-2 text-sm flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
            <h2 className="font-semibold">About</h2>
            <ClampText text={user?.bio} clampLines={2} />
          </div>
        )}
        {user && (
          <Suspense fallback={<Loader />}>
            <ProfilePanelContactInfo contactInfo={user.contactInfo} />
          </Suspense>
        )}
        {currentChat && currentChat?.sharedMedia && (
          <SharedMedia sharedMedia={currentChat?.sharedMedia} />
        )}

        {currentChat && currentChat?.sharedFiles && (
          <SharedFiles sharedFiles={currentChat?.sharedFiles} />
        )}

        {isContactPanel && <ContactButtons />}
      </div>
    </div>
  );
};

const ContactButtons = () => {
  return (
    <div className="sticky bottom-0 w-full flex justify-center items-center h-40">
      <div className="flex items-center bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 rounded-full shadow-lg dark:shadow-neutral-900/50">
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="paper_plane" weight="thin" className="size-6.5" />
          <Label text="Chat" />
        </button>

        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="phone" weight="thin" className="size-6.5" />
          <Label text="Call" />
        </button>
      </div>
    </div>
  );
};

const SideProfilePanel = ({
  user,
  contacts,
  currentChat = null,
  isContactPanel = false,
  isActive,
  toggleButtonClickAction = () => {},
}: {
  user: User | null;
  contacts: Record<string, string>;
  currentChat?: Chat | null;
  isContactPanel?: boolean;
  isActive: boolean;
  toggleButtonClickAction?: () => void;
}): ReactNode => {
  const { authNUser } = useAuth(),
    { theme } = useTheme(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(user?._id ?? "") ?? false,
    isContact: boolean = (user?._id ?? "") in contacts,
    isMuted: boolean = authNUser?.mutedUsers.includes(user?._id ?? "") ?? false;
  return (
    <aside
      className={`sticky  top-0 shrink-0 h-dvh overflow-hidden transition-all duration-300 ease-in-out flex flex-col bg-background-light-surface-2 dark:bg-background-dark-surface-2 ${isActive ? "w-80 opacity-100" : "w-0 opacity-0"}`}
      // className={`fixed top-0 h-dvh w-80 flex flex-col bg-background-light-surface-2 dark:bg-background-dark-surface-2 z-30 transition-all ease-in-out duration-300 right-0 ${isActive ? "scale-100" : "scale-0"} self-start`}
    >
      <ProfilePanelHeader
        user={user}
        theme={theme}
        toggleButtonClickAction={toggleButtonClickAction}
      />
      <ProfilePanelMainInfo user={user} contacts={contacts} />
      <ProfilePanelControlButtons
        isContact={isContact}
        isBlocked={isBlocked}
        isMuted={isMuted}
      />
      <ProfilePanelMinorInfo
        user={user}
        currentChat={currentChat}
        isContactPanel={isContactPanel}
      />
    </aside>
  );
};

export default SideProfilePanel;
