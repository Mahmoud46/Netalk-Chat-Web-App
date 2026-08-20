import { lazy, useState, type ReactNode } from "react";
import { useAuth, useTheme } from "../hooks";
import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";
import SocialIcon from "../components/icons/SocialIcon";
import { formatPhoneNumber } from "../utils/format";
import { copyToClipboard } from "../utils/helpers";
import type { AuthNUser, ThemeMode } from "../types";

const CopyContactButton = lazy(() =>
  import("../components/common/DropList").then((module) => ({
    default: module.CopyContactButton,
  })),
);

export const UsernameHolder = ({
  username = "",
  isXs = false,
  className = "",
}: {
  username?: string;
  isXs?: boolean;
  className?: string;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  return (
    <p
      className={`group flex relative w-fit items-center opacity-80 hover:opacity-100 cursor-pointer transition-all ease-in-out pt-2 pl-0 ${isXs ? "text-xs" : "text-sm"} text-foreground-light-secondary dark:text-foreground-dark-secondary ${className}`}
      onClick={async () => {
        const copied = await copyToClipboard(username);
        setIsCopied(copied);

        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }}
    >
      <span className="font-semibold">@{username}</span>
      <Label text={isCopied ? "Copied" : "Copy"} />
      <CommonIcon
        label={isCopied ? "copy_check" : "copy"}
        className={`${isXs ? "size-4 ml-1" : "size-4.5 ml-2"}`}
      />
    </p>
  );
};

export const ContactsInfo = ({
  authNUser,
}: {
  authNUser?: AuthNUser | null;
}) => {
  return (
    <div
      className={`w-90 z-10 gap-2 bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-3xl p-2 flex flex-col items-start transition-all ease-in-out shadow-lg dark:shadow-neutral-900/50`}
    >
      <h2 className="font-semibold pt-2">Contact Info</h2>
      <div className="flex flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary w-full">
        {authNUser?.contactInfo.emails.map((email) => (
          <div
            key={email}
            className="text-sm relative py-2.5 pl-0 hover:pl-2 flex justify-between items-center gap-2 transition-all ease-in-out w-full p-0 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="envelope_alt"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />

              <p className="line-clamp-1 flex-1">{email}</p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <CopyContactButton text={email} />
              <a
                href={`mailto:${email}`}
                target="_blank"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon
                  label="paper_plane"
                  weight="thin"
                  className="size-6"
                />
                <Label text="Mail" />
              </a>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.phoneNumbers.map((phoneNumber) => (
          <div
            key={phoneNumber}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative py-2.5 pl-0 hover:pl-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="phone"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />
              <p className="line-clamp-1 flex-1">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <CopyContactButton text={phoneNumber} />
              <a
                href={`tel:${phoneNumber}`}
                target="_blank"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon label="phone" weight="thin" className="size-6" />
                <Label text="Call" />
              </a>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.socialLinks.map((socialLink) => (
          <div
            key={socialLink.url}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full relative py-2.5 pl-0 hover:pl-2 rounded-3xl group/card cursor-pointer hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2"
          >
            <div className="flex gap-3 items-center">
              <SocialIcon
                platform={socialLink.type}
                className="size-6 flex-none opacity-60"
                weight="thin"
              />
              <p className="line-clamp-1 flex-1">{socialLink.url}</p>
            </div>
            <div className="flex absolute right-0 items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out bg-background-light-surface-2 dark:bg-background-dark-surface-2 rounded-3xl p-0.5">
              <CopyContactButton text={socialLink.url} />
              <a
                href={socialLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              >
                <CommonIcon
                  label="arrow_out_up_right_circle"
                  weight="thin"
                  className="size-6"
                />
                <Label text="View" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const ProfileHeader = ({
  authNUser,
  theme,
}: {
  authNUser: AuthNUser | null;
  theme: ThemeMode;
}) => {
  return (
    <div className="h-60 w-full relative cursor-pointer group/cover">
      <div className="absolute top-0 right-0 opacity-0 group-hover/cover:opacity-100 bg-background-light-base dark:bg-background-dark-base p-2 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
        <button className="relative group cursor-pointer scale-0 group-hover/cover:scale-100 z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="edit" weight="thin" className="size-6" />
          <Label text="Edit" />
        </button>
      </div>
      <div className="absolute top-0 left-1/2 bg-background-light-base dark:bg-background-dark-base -translate-x-1/2 p-4 pt-2 rounded-b-3xl">
        <UsernameHolder username={authNUser?.username} />
      </div>
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
      <div className="absolute group/avatar -bottom-19 rounded-full left-30 bg-background-light-base dark:bg-background-dark-base p-3 flex">
        <img
          src={authNUser?.profileImage}
          alt="profile-image"
          loading="lazy"
          className="size-35 rounded-full"
        />

        <div className="bg-background-light-base dark:bg-background-dark-base scale-0 group-hover/avatar:scale-100 p-2 absolute rounded-full bottom-0 right-0 transition-all ease-in-out">
          <button className="relative group cursor-pointer z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="edit" weight="thin" className="size-6" />
            <Label text="Edit" />
          </button>
        </div>
      </div>
      {/* Header buttons */}
      <div className="absolute bg-background-light-base dark:bg-background-dark-base bottom-0 right-0 p-2 rounded-tl-3xl">
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="cog" weight="thin" className="size-6.5" />
          <Label text="Settings" />
        </button>
        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="share" weight="thin" className="size-6.5" />
          <Label text="Share" />
        </button>
      </div>
    </div>
  );
};

export default function Profile(): ReactNode {
  const { authNUser } = useAuth(),
    { theme } = useTheme();

  return (
    <div className="w-full min-h-dvh overflow-x-hidden text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col gap-20">
      <ProfileHeader authNUser={authNUser} theme={theme} />
      <div className="relative pl-30 pr-8 flex items-start gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-5xl">
              {authNUser?.firstName}{" "}
              <span className="font-semibold gradient bg-clip-text text-transparent">
                {authNUser?.lastName}{" "}
              </span>
            </h2>
            {authNUser?.title && (
              <h3 className="text-xl">{authNUser?.title}</h3>
            )}
            {authNUser?.address && (
              <p className="flex items-center text-base gap-2 text-foreground-light-secondary dark:text-foreground-dark-secondary">
                <CommonIcon
                  label="location_alt"
                  weight="thin"
                  className="size-6"
                />
                {authNUser?.address}
              </p>
            )}
          </div>
          {authNUser?.bio && (
            <div className="flex flex-col gap-2 min-w-80">
              <h2 className="font-semibold">About</h2>
              <p>{authNUser?.bio}</p>
            </div>
          )}
        </div>
        <ContactsInfo authNUser={authNUser} />
      </div>
    </div>
  );
}

//  <div className="px-18">
//         <div className="flex flex-col">
//           <div className="flex flex-wrap items-start gap-6 bg-background-light-base/50 dark:bg-background-dark-base/50 flex-1 p-4 pl-0 pt-0 backdrop-blur-md rounded-t-3xl rounded-tl-[55px]">
//             <div className="flex-none bg-background-light-base dark:bg-background-dark-base p-3 rounded-full rounded-bl-none">
//               <div className="relative cursor-pointer group/avatar">
//                 {authNUser?.profileImage && (
//                   <img
//                     src={authNUser?.profileImage}
//                     alt="profile-image"
//                     loading="lazy"
//                     className="size-30 rounded-full"
//                   />
//                 )}

//                 <div className="absolute opacity-0 group-hover/avatar:opacity-100 transition-all ease-in-out -right-4 -bottom-4 bg-background-light-base dark:bg-background-dark-base rounded-full p-1.5">
//                   <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
//                     <CommonIcon label="edit" weight="thin" className="size-6" />
//                     <Label text="Edit" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//             <div className="flex-1 flex flex-col gap-4 pt-4">
//               <div className="flex flex-col gap-2">
//                 <UsernameHolder username={authNUser?.username} />
//                 <p className="text-6xl">
//                   {authNUser?.firstName}{" "}
//                   <span className="font-semibold gradient bg-clip-text text-transparent">
//                     {authNUser?.lastName}
//                   </span>
//                 </p>
//                 {authNUser?.title && (
//                   <p className="font-semibold text-xl">{authNUser?.title}</p>
//                 )}
//                 {authNUser?.address && (
//                   <p className="flex items-center text-sm gap-2 justify-start text-foreground-light-secondary dark:text-foreground-dark-secondary">
//                     <CommonIcon
//                       label="location_alt"
//                       weight="thin"
//                       className="size-5.5"
//                     />
//                     {authNUser?.address}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="flex items-start gap-6 p-4 pl-34 flex-wrap">
//             {authNUser?.bio && (
//               <div className="flex flex-col gap-2 min-w-80">
//                 <h2 className="font-semibold">About</h2>
//                 <p>{authNUser?.bio}</p>
//               </div>
//             )}
//             <ContactsInfo authNUser={authNUser} />
//           </div>
//         </div>
//       </div>
