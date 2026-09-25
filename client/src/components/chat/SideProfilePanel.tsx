import type { ReactNode } from "react";
import { useAuth, useTheme } from "../../hooks";
import Label from "../common/Label";
import { lazy, Suspense, useEffect, useState } from "react";

import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../icons/CommonIcon";

import type {
  Attachment,
  Chat,
  CustomName,
  ThemeMode,
  User,
} from "../../types";
import { Link } from "react-router-dom";
import { SideProfilePanelDropList } from "../common/DropList";
import ChatIcon from "../icons/ChatIcon";
import Loader from "../common/Loader";

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
      <div className="absolute top-0 left-0 bg-background-light-base dark:bg-background-dark-base p-1.5 pt-3 rounded-br-3xl top-left-cornered-btn  [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        <button
          className="relative group cursor-pointer z-30 p-1.5 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
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

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 rounded-full side-porfile-panel-image [--shadow-color:#f9f1ff] dark:[--shadow-color:#16181d]">
        {user?.profileImage && (
          <img
            src={user?.profileImage}
            alt="profile-image"
            loading="lazy"
            className="size-22 rounded-full"
          />
        )}
        {user?.isActive && (
          <span className="absolute flex items-center p-1 aspect-square bg-background-light-surface-2 dark:bg-background-dark-surface-2 justify-center rounded-full right-1 bottom-1">
            <span className="bg-foreground-dark-success size-[1.21rem] aspect-square rounded-full"></span>
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
  contacts: Record<string, CustomName>;
}) => {
  return (
    <div className="flex flex-col justify-center p-4 pt-4 mt-12 mb-4 gap-2 items-center">
      <ClampText
        text={
          contacts[user?._id ?? ""]
            ? `${contacts[user?._id ?? ""]?.firstName} ${contacts[user?._id ?? ""]?.lastName}`
            : `${user?.firstName} ${user?.lastName}`
        }
        className="text-center font-semibold text-lg text-foreground-light-secondary dark:text-foreground-dark-secondary"
      />

      {user?.address && (
        <div className="text-sm flex items-center gap-2 justify-center text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <CommonIcon label="location_alt" weight="thin" className="size-5" />
          {user?.address}
        </div>
      )}
    </div>
  );
};

const ProfilePanelControlButtons = ({
  username,
  isContact,
  isMuted,
  isBlocked,
}: {
  username: string | undefined;
  isContact: boolean;
  isMuted: boolean;
  isBlocked: boolean;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="relative bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-t-3xl flex flex-col transition-all ease-in-out">
      <SideProfilePanelDropList
        isActive={isActive}
        setIsActive={setIsActive}
        isContact={isContact}
        isBlocked={isBlocked}
      />
      <div className="flex items-center -translate-y-3 w-fit bg-background-light-surface-2 dark:bg-background-dark-surface-2 self-center p-2 pt-0 rounded-b-3xl relative profile-main-buttons-container [--shadow-color:#f9f1ff] dark:[--shadow-color:#16181d]">
        <Link
          to={`/app/profile/${username}`}
          className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        >
          <CommonIcon label="user" weight="thin" className="size-6.5" />
          <Label text="Profile" />
        </Link>
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon
            label={isMuted ? "bell" : "bell_slash"}
            weight="thin"
            className="size-6.5"
          />
          <Label text={isMuted ? "Unmute" : "Mute"} />
        </button>
        <button
          type="button"
          onClick={() => setIsActive((prev) => !prev)}
          className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        >
          <CommonIcon
            label="dots_vertical_rounded"
            weight="thin"
            className="size-6.5"
            soild={true}
          />
          <Label text="More" />
        </button>
      </div>
    </div>
  );
};

const ProfilePanelMinorInfo = ({
  currentChat,
}: {
  user: User | null;
  currentChat: Chat | null;
}) => {
  const [sharedItemsActiveTab, setSharedItemsActiveTab] = useState<number>(-1);

  useEffect(() => {
    const activateTab = async () => {
      if (currentChat)
        setSharedItemsActiveTab(
          currentChat && currentChat?.sharedMedia
            ? 0
            : currentChat && currentChat?.sharedFiles
              ? 1
              : -1,
        );
    };

    activateTab();
  }, [currentChat, currentChat?._id]);

  return (
    <div className="flex-1 overflow-auto gap-4 bg-background-light-surface-3 dark:bg-background-dark-surface-3 flex flex-col transition-all ease-in-out">
      <div className="h-full overflow-y-auto px-3 py-5 pt-0 flex flex-col gap-6">
        {currentChat?.sharedMedia && sharedItemsActiveTab == 0 && (
          <Suspense fallback={<Loader />}>
            <SharedMedia
              sharedMedia={currentChat?.sharedMedia as Attachment[]}
            />
          </Suspense>
        )}

        {currentChat?.sharedFiles && sharedItemsActiveTab == 1 && (
          <Suspense fallback={<Loader />}>
            <SharedFiles
              sharedFiles={currentChat?.sharedFiles as Attachment[]}
            />
          </Suspense>
        )}
        {sharedItemsActiveTab != -1 && (
          <div className="flex w-fit self-center sticky bottom-0 items-center p-1.5 z-50 bg-background-light-base dark:bg-background-dark-base shadow-xl/30 rounded-full">
            {currentChat && currentChat?.sharedMedia && (
              <button
                type="button"
                className={`relative group cursor-pointer p-2 rounded-full ${sharedItemsActiveTab == 0 ? "bg-background-dark-primary" : "bg-transparent hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary"} transition-all ease-in-out`}
                onClick={() => setSharedItemsActiveTab(0)}
              >
                <ChatIcon
                  label="image"
                  className="size-6.5"
                  weight="thin"
                  solid={sharedItemsActiveTab == 0}
                />
                <Label text="Media" />
              </button>
            )}
            {currentChat && currentChat?.sharedFiles && (
              <button
                type="button"
                className={`relative group cursor-pointer p-2 rounded-full ${sharedItemsActiveTab == 1 ? "bg-background-dark-primary" : "bg-transparent hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary"} transition-all ease-in-out`}
                onClick={() => setSharedItemsActiveTab(1)}
              >
                <ChatIcon
                  label="file"
                  className="size-6.5"
                  weight="thin"
                  solid={sharedItemsActiveTab == 1}
                />
                <Label text="Files" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SideProfilePanel = ({
  user,
  contacts,
  currentChat = null,
  isActive,
  toggleButtonClickAction = () => {},
}: {
  user: User | null;
  contacts: Record<string, CustomName>;
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
      className={`sticky top-0 shrink-0 h-dvh overflow-hidden transition-all duration-300 ease-in-out flex flex-col bg-background-light-surface-2 dark:bg-background-dark-surface-2 ${isActive ? "w-70 opacity-100" : "w-0 opacity-0"}`}
    >
      <ProfilePanelHeader
        user={user}
        theme={theme}
        toggleButtonClickAction={toggleButtonClickAction}
      />
      <ProfilePanelMainInfo user={user} contacts={contacts} />
      <ProfilePanelControlButtons
        username={user?.username}
        isContact={isContact}
        isBlocked={isBlocked}
        isMuted={isMuted}
      />
      <ProfilePanelMinorInfo user={user} currentChat={currentChat} />
    </aside>
  );
};

export default SideProfilePanel;
