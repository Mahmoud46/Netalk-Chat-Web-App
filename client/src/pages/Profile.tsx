import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAuth, useChat, useTheme } from "../hooks";
import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";
import { calculateAge, copyToClipboard } from "../utils/helpers";
import type { AuthNUser, Gender, ThemeMode, User } from "../types";
import { Link, useLocation, useParams } from "react-router-dom";
import { Avatar } from "../components/icons/Avatar";
import Loader from "../components/common/Loader";

const ContactSocialCard = lazy(() =>
    import("../components/common/Card").then((module) => ({
      default: module.ContactSocialCard,
    })),
  ),
  ContactPhoneNumberCard = lazy(() =>
    import("../components/common/Card").then((module) => ({
      default: module.ContactPhoneNumberCard,
    })),
  ),
  ContactEmailCard = lazy(() =>
    import("../components/common/Card").then((module) => ({
      default: module.ContactEmailCard,
    })),
  );

export const UsernameHolder = ({
  username = "",
  isXs = false,
  className = "",
  isTopProfile = true,
}: {
  username?: string;
  isXs?: boolean;
  className?: string;
  isTopProfile?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  return (
    <div
      className={
        isTopProfile
          ? "absolute group top-0 left-1/2 bg-background-light-base dark:bg-background-dark-base -translate-x-1/2 p-4 pt-2 rounded-b-3xl username-profile-corners [--shadow-color:#ffffff] dark:[--shadow-color:#0f1115]"
          : ""
      }
    >
      <div
        className={`flex relative w-fit items-center opacity-80 hover:opacity-100 cursor-pointer transition-all ease-in-out pt-2 pl-0 ${isXs ? "text-xs" : "text-sm"} text-foreground-light-secondary dark:text-foreground-dark-secondary ${className}`}
        onClick={async () => {
          const copied = await copyToClipboard(username);
          setIsCopied(copied);

          setTimeout(() => {
            setIsCopied(false);
          }, 1000);
        }}
      >
        <span className="font-semibold">@{username}</span>
        <CommonIcon
          label={isCopied ? "copy_check" : "copy"}
          className={`${isXs ? "size-4 ml-1" : "size-4.5 ml-2"}`}
        />
      </div>
      <Label text={isCopied ? "Copied" : "Copy"} />
    </div>
  );
};

export const ContactsInfo = ({
  authNUser,
}: {
  authNUser?: AuthNUser | User | null;
}) => {
  const { theme } = useTheme();
  return (
    <div
      className={`w-100 max-h-100 z-10 gap-2 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-3 flex flex-col items-start transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <h2 className="font-semibold pt-2">Contact Info</h2>
      <div className="flex flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary w-full">
        {authNUser?.contactInfo.emails.map((email) => (
          <Suspense fallback={<Loader />} key={email}>
            <ContactEmailCard email={email} />
          </Suspense>
        ))}
        {authNUser?.contactInfo.phoneNumbers.map((phoneNumber) => (
          <Suspense fallback={<Loader />} key={phoneNumber}>
            <ContactPhoneNumberCard phoneNumber={phoneNumber} />
          </Suspense>
        ))}
        {authNUser?.contactInfo.socialLinks.map((socialLink) => (
          <Suspense fallback={<Loader />} key={socialLink.url}>
            <ContactSocialCard socialLink={socialLink} theme={theme} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export const ProfileHeader = ({
  authNUser,
  theme,
  isAuthNUser,
  setIsShareProfileActive,
}: {
  authNUser: AuthNUser | User | null;
  theme: ThemeMode;
  isAuthNUser: boolean;
  setIsShareProfileActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="h-60 w-full relative cursor-pointer">
      {isAuthNUser && (
        <div className="absolute top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-1.5 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
          <button className="relative group cursor-pointer z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="edit" weight="thin" className="size-6" />
            <Label text="Edit" />
          </button>
        </div>
      )}
      <UsernameHolder username={authNUser?.username} />

      <img
        src={
          authNUser?.profileCover ??
          (theme == "dark" ? default_cover_dark : default_cover)
        }
        alt="participant-profile-cover"
        loading="lazy"
        className="h-full w-full rounded-b-3xl object-cover"
      />
      {/* Profile pic */}
      <div className="absolute -bottom-19 rounded-full left-30 bg-background-light-base dark:bg-background-dark-base p-3 flex profile-image-corners [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        {authNUser?.profileImage ? (
          <img
            src={authNUser?.profileImage}
            alt="profile-image"
            loading="lazy"
            className="size-35 rounded-full"
          />
        ) : (
          <div className="size-35 rounded-full flex-none overflow-hidden">
            <Avatar
              gender={authNUser?.gender as Gender}
              age={calculateAge(authNUser?.birthdate as string)}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {isAuthNUser && (
          <div className="bg-background-light-base dark:bg-background-dark-base p-1.5 absolute rounded-full bottom-1.5 right-1.5 transition-all ease-in-out">
            <button className="relative group cursor-pointer z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Edit" />
            </button>
          </div>
        )}
        {!isAuthNUser && authNUser?.isActive && (
          <div className="bg-background-light-base dark:bg-background-dark-base p-1.5 absolute rounded-full bottom-1.5 right-1.5 transition-all ease-in-out flex items-center">
            <span className="bg-foreground-dark-success size-[1.925rem] aspect-square rounded-full"></span>
          </div>
        )}
      </div>
      {/* Header buttons */}
      <div className="absolute flex bottom-0 right-0 bg-background-light-base dark:bg-background-dark-base p-1.5 rounded-tl-3xl bottom-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        {!isAuthNUser && authNUser && (
          <Link
            to={`/app/inbox/${authNUser._id}`}
            className="relative group mr-2 cursor-pointer p-2 rounded-full gradient transition-all ease-in-out"
          >
            <CommonIcon
              label="paper_plane"
              className="size-6.5 transition-all ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1"
              weight="thin"
              soild={true}
            />
            <Label text="Chat" />
          </Link>
        )}
        {isAuthNUser && (
          <Link
            to={"/app/settings/account"}
            className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon label="cog" weight="thin" className="size-6.5" />
            <Label text="Settings" />
          </Link>
        )}
        <button
          onClick={() => setIsShareProfileActive(true)}
          className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
        >
          <CommonIcon label="share" weight="thin" className="size-6.5" />
          <Label text="Share" />
        </button>
        {!isAuthNUser && (
          <button className="relative z-10 group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon
              label="dots_vertical_rounded"
              weight="thin"
              soild={true}
              className="size-6.5"
            />
            <Label text="More" />
          </button>
        )}
      </div>
    </div>
  );
};

const ShareProfileInfoScreen = ({
  user,
  isActive,
  setIsActive,
}: {
  user: AuthNUser | User | null;
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const fullProfileLink = window.origin + useLocation().pathname;
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const shareWindow = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shareWindow.current &&
        !shareWindow.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareWindow, setIsActive]);

  return (
    <>
      {user && isActive && (
        <div className="fixed bg-transparent backdrop-blur-lg w-full h-full z-40 flex items-center justify-center">
          <div
            ref={shareWindow}
            className="flex flex-col p-1.5 bg-background-light-base dark:bg-background-dark-base rounded-3xl w-80 gap-8 items-center shadow-lg dark:shadow-neutral-900/50"
          >
            <div className="flex gap-2 w-full items-center justify-between text-foreground-light-secondary dark:text-foreground-dark-secondary">
              <div className="flex gap-2 items-center font-semibold p-1.5">
                <CommonIcon label="share" weight="thin" className="size-6.5" />
                <p>Share Profile</p>
              </div>

              <div className="flex items-center z-30">
                <button
                  type="button"
                  className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
                  onClick={() => setIsActive(false)}
                >
                  <CommonIcon label="x" weight="thin" className="size-6" />
                  <Label text="Close" />
                </button>
              </div>
            </div>
            {user?.profileImage ? (
              <img
                src={user?.profileImage}
                alt="profile-image"
                loading="lazy"
                className="size-35 rounded-full"
              />
            ) : (
              <div className="size-35 rounded-full flex-none overflow-hidden">
                <Avatar
                  gender={user?.gender as Gender}
                  age={calculateAge(user?.birthdate as string)}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="relative w-full">
              <CommonIcon
                label="link"
                weight="thin"
                className="size-6 absolute top-1/2 left-3 -translate-y-1/2"
              />
              <input
                type="text"
                readOnly
                value={fullProfileLink}
                className="flex items-center gap-2 w-full rounded-full pl-11 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
              />

              <button
                type="button"
                onClick={async () => {
                  const copied = await copyToClipboard(fullProfileLink);
                  setIsCopied(copied);

                  setTimeout(() => {
                    setIsCopied(false);
                  }, 1000);
                }}
                className="absolute bg-background-light-surface-2 dark:bg-background-dark-surface-2 top-1/2 -translate-y-1/2 right-0.5 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon
                  label={isCopied ? "copy_check" : "copy"}
                  weight="thin"
                  className="size-6"
                />
                <Label text={isCopied ? "Copied" : "Copy"} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default function Profile(): ReactNode {
  const { username } = useParams();
  const { authNUser } = useAuth(),
    { theme } = useTheme(),
    { getUserByUsername } = useChat();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isAuthNUser: boolean = username?.trim() == authNUser?.username;
  const [isShareProfileActive, setIsShareProfileActive] =
    useState<boolean>(false);
  useEffect(() => {
    const init = async () => {
      if (username && !isAuthNUser) {
        const user = await getUserByUsername(username);
        if (user) setCurrentUser(user);
      }
    };
    init();
  }, [getUserByUsername, isAuthNUser, username]);
  return (
    <div className="w-full min-h-dvh overflow-x-hidden text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col gap-20 pb-4 relative">
      <ProfileHeader
        authNUser={isAuthNUser ? authNUser : currentUser}
        theme={theme}
        isAuthNUser={isAuthNUser}
        setIsShareProfileActive={setIsShareProfileActive}
      />
      <div className="pl-30 pr-8 flex items-start gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl">
              {isAuthNUser ? authNUser?.firstName : currentUser?.firstName}{" "}
              <span className="font-semibold gradient bg-clip-text text-transparent">
                {isAuthNUser ? authNUser?.lastName : currentUser?.lastName}{" "}
              </span>
            </h2>
            {authNUser?.title && (
              <h3 className="text-xl">
                {isAuthNUser ? authNUser?.title : currentUser?.title}
              </h3>
            )}
            {authNUser?.address && (
              <p className="flex items-center text-base gap-2 text-foreground-light-secondary dark:text-foreground-dark-secondary">
                <CommonIcon
                  label="location_alt"
                  weight="thin"
                  className="size-6"
                />
                {isAuthNUser ? authNUser?.address : currentUser?.address}
              </p>
            )}
          </div>
          {authNUser?.bio && (
            <div className="flex flex-col gap-2 min-w-80">
              <h2 className="font-semibold">About</h2>
              <p>{isAuthNUser ? authNUser?.bio : currentUser?.bio}</p>
            </div>
          )}
        </div>
        <ContactsInfo authNUser={isAuthNUser ? authNUser : currentUser} />
      </div>

      <ShareProfileInfoScreen
        user={isAuthNUser ? authNUser : currentUser}
        isActive={isShareProfileActive}
        setIsActive={setIsShareProfileActive}
      />
    </div>
  );
}
