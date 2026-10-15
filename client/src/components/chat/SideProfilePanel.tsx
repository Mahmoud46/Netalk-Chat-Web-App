import type { ReactNode } from "react";
import { useAuth, useChat, useTheme } from "../../hooks";
import Label from "../common/Label";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import empty_media_image from "../../assets/images/empty_media.png";
import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../icons/CommonIcon";

import type {
  Attachment,
  Chat,
  CustomName,
  Gender,
  ThemeMode,
  User,
} from "../../types";
import { Link } from "react-router-dom";
import { SideProfilePanelDropList } from "../common/DropList";
import ChatIcon from "../icons/ChatIcon";
import Loader from "../common/Loader";
import { Avatar } from "../icons/Avatar";
import { calculateAge } from "../../utils/helpers";
import moment from "moment";

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
    <div className="relative flex flex-col max-md:h-40">
      {/* Close buttoon */}
      <div className="absolute top-0 left-0 bg-background-light-base dark:bg-background-dark-base p-1.5 pt-3 rounded-br-3xl top-left-cornered-btn  [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        <button
          className="relative group cursor-pointer z-30 p-1.5 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          onClick={toggleButtonClickAction}
        >
          <CommonIcon
            label="chevron_right"
            weight="thin"
            className="size-7 transition-all ease-in-out max-md:rotate-180"
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
        className="w-full h-full object-cover rounded-b-3xl"
      />

      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-2 rounded-full side-porfile-panel-image [--shadow-color:#f9f1ff] dark:[--shadow-color:#16181d]">
        {user?.profileImage ? (
          <img
            src={user?.profileImage}
            alt="profile-image"
            loading="lazy"
            className="size-22 rounded-full"
          />
        ) : (
          <div className="size-22 rounded-full flex-none overflow-hidden">
            <Avatar
              gender={user?.gender as Gender}
              age={calculateAge(user?.birthdate as string)}
              className="w-full h-full object-cover"
            />
          </div>
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

const HorizontalProfileHeader = ({
  user,
  toggleButtonClickAction = () => {},
  isContact,
  isMuted,
  isBlocked,
}: {
  user: User | null;
  toggleButtonClickAction?: () => void;
  isContact: boolean;
  isMuted: boolean;
  isBlocked: boolean;
}) => {
  const { contacts } = useChat();
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <header className="flex items-center w-full p-1.5 relative bg-background-light-surface-3 dark:bg-background-dark-surface-3 shadow-2xl rounded-3xl dark:shadow-neutral-900/50">
      <button
        type="button"
        onClick={toggleButtonClickAction}
        className={`relative flex-none group cursor-pointer z-30 p-1.5 aspect-square rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out`}
      >
        <CommonIcon
          label="chevron_right"
          weight="thin"
          className={`size-7 transition-all ease-in-out max-md:rotate-180`}
        />
        <Label text="Back" className="md:hidden" />
        <Label text="Close" className="max-md:hidden" />
      </button>
      <div
        className="flex gap-4 items-center flex-1 cursor-pointer"
        onClick={toggleButtonClickAction}
      >
        <Link
          to={`/app/profile/${user?.username}`}
          className="relative flex-none"
        >
          {user?.isActive && (
            <span className="absolute flex items-center w-4 h-4 bg-background-light-surface-3 dark:bg-background-dark-surface-3 justify-center rounded-full -bottom-0.5 -right-0.5">
              <span className="bg-foreground-dark-success size-[0.605rem] aspect-square rounded-full"></span>
            </span>
          )}
          {user?.profileImage ? (
            <img
              src={user?.profileImage}
              alt={user?.firstName}
              loading="lazy"
              className="size-11 rounded-full flex-none"
            />
          ) : (
            <div className="size-11 rounded-full flex-none overflow-hidden">
              <Avatar
                gender={user?.gender as Gender}
                age={calculateAge(user?.birthdate as string)}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </Link>
        <div className="flex flex-col">
          <p className="font-semibold text-base text-foreground-light-secondary dark:text-foreground-dark-secondary leading-5 line-clamp-1">
            {contacts[user?._id ?? ""]
              ? `${contacts[user?._id ?? ""].firstName} ${contacts[user?._id ?? ""].lastName}`
              : `${user?.firstName} ${user?.lastName}`}
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
      <div className="flex-none w-max flex">
        <SideProfilePanelDropList
          isActive={isActive}
          setIsActive={setIsActive}
          isContact={isContact}
          isBlocked={isBlocked}
          isHorizontal={true}
          isMuted={isMuted}
        />
        <Link
          to={`/app/profile/${user?.username}`}
          className="relative flex-none group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        >
          <CommonIcon label="user" weight="thin" className="size-6.5" />
          <Label text="Profile" />
        </Link>
        {!isActive && (
          <button
            type="button"
            onClick={() => setIsActive((prev) => !prev)}
            className={`group cursor-pointer relative p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out`}
          >
            <CommonIcon
              label="dots_vertical_rounded"
              className="size-6.5"
              soild={true}
            />
            <Label text="More" />
          </button>
        )}
        {isActive && (
          <button
            type="button"
            className={`group cursor-pointer relative p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out`}
          >
            <CommonIcon
              label="dots_vertical_rounded"
              className="size-6.5"
              soild={true}
            />
            <Label text="Less" />
          </button>
        )}
      </div>
    </header>
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
        {!isActive && (
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
        )}
        {isActive && (
          <button
            type="button"
            className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon
              label="dots_vertical_rounded"
              weight="thin"
              className="size-6.5"
              soild={true}
            />
            <Label text="Less" />
          </button>
        )}
      </div>
    </div>
  );
};

const SharedMediaFilesButtons = ({
  currentChat,
  sharedItemsActiveTab,
  setSharedItemsActiveTab,
}: {
  currentChat: Chat | null;
  sharedItemsActiveTab: number;
  setSharedItemsActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex w-fit self-center items-center p-1.5 bg-background-light-base dark:bg-background-dark-base rounded-full shadow-xl dark:shadow-neutral-900/50">
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
          {sharedItemsActiveTab != 0 && <Label text="Media" />}
          {sharedItemsActiveTab != 0 && currentChat?.sharedMedia.length > 0 && (
            <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-0 -right-1 z-10">
              {currentChat?.sharedMedia.length > 99
                ? `+${99}`
                : currentChat?.sharedMedia?.length}
            </span>
          )}
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
          {sharedItemsActiveTab != 1 && <Label text="Files" />}
          {sharedItemsActiveTab != 1 && currentChat?.sharedFiles.length > 0 && (
            <span className="text-white absolute text-xs bg-background-light-primary shadow-xl/30 w-6 py-0.5 flex items-center justify-center rounded-full top-0 -right-1 z-10">
              {currentChat?.sharedFiles.length > 99
                ? `+${99}`
                : currentChat?.sharedFiles?.length}
            </span>
          )}
        </button>
      )}
    </div>
  );
};

const ProfilePanelMinorInfo = ({
  currentChat,
  sharedItemsActiveTab,
  setSharedItemsActiveTab,
}: {
  currentChat: Chat | null;
  sharedItemsActiveTab: number;
  setSharedItemsActiveTab: React.Dispatch<React.SetStateAction<number>>;
}) => {
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
  }, [currentChat, currentChat?._id, setSharedItemsActiveTab]);

  return (
    <div className="gap-4 flex-1 bg-background-light-surface-3 dark:bg-background-dark-surface-3 flex flex-col transition-all ease-in-out">
      <div className="h-full overflow-y-auto px-3 py-5 pt-0 flex flex-col gap-6">
        {sharedItemsActiveTab != -1 && (
          <SharedMediaFilesButtons
            currentChat={currentChat}
            sharedItemsActiveTab={sharedItemsActiveTab}
            setSharedItemsActiveTab={setSharedItemsActiveTab}
          />
        )}

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

        {sharedItemsActiveTab == -1 && (
          <div className="flex flex-col items-center">
            <img
              src={empty_media_image}
              alt="empty-media"
              loading="lazy"
              className="size-40"
            />
            <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary text-center">
              Nothing to see here yet. Photos, videos, and other media shared in
              this chat will show up here.
            </p>
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
  const scrollableSidebar = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [sharedItemsActiveTab, setSharedItemsActiveTab] = useState<number>(-1);

  useEffect(() => {
    const scrollablePanel = scrollableSidebar.current;

    if (!scrollablePanel) return;

    const handleScroll = () => {
      // console.log(scrollablePanel.scrollTop);
      setScrollTop(scrollablePanel.scrollTop as number);
    };

    scrollablePanel.addEventListener("scroll", handleScroll);

    return () => scrollablePanel?.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <aside
      ref={scrollableSidebar}
      className={`sticky top-0 shrink-0 overflow-auto h-dvh transition-all duration-300 ease-in-out flex flex-col bg-background-light-surface-2 dark:bg-background-dark-surface-2 ${isActive ? "md:w-80 opacity-100 max-md:fixed max-md:w-full max-md:z-50 max-md:left-0" : "w-0 opacity-0"}`}
    >
      {scrollTop > 200 && (
        <div className="flex flex-col sticky top-0 z-20 items-center p-2 gap-2">
          <HorizontalProfileHeader
            user={user}
            toggleButtonClickAction={toggleButtonClickAction}
            isContact={isContact}
            isBlocked={isBlocked}
            isMuted={isMuted}
          />
          {scrollTop > 422 && sharedItemsActiveTab != -1 && (
            <SharedMediaFilesButtons
              currentChat={currentChat}
              sharedItemsActiveTab={sharedItemsActiveTab}
              setSharedItemsActiveTab={setSharedItemsActiveTab}
            />
          )}
        </div>
      )}
      <div className="flex-1 flex flex-col">
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
        <ProfilePanelMinorInfo
          currentChat={currentChat}
          sharedItemsActiveTab={sharedItemsActiveTab}
          setSharedItemsActiveTab={setSharedItemsActiveTab}
        />
      </div>
    </aside>
  );
};

export default SideProfilePanel;
