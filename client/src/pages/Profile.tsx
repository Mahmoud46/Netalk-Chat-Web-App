import { useState, type ReactNode } from "react";
import { useAuth, useTheme } from "../hooks";
import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";
import SocialIcon from "../components/icons/SocialIcon";
import { formatPhoneNumber } from "../utils/format";
import { copyToClipboard } from "../utils/helpers";

export const UsernameHolder = ({
  username = "",
  isXs = false,
}: {
  username?: string;
  isXs?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  return (
    <p
      className={`group flex relative w-fit items-center opacity-80 hover:opacity-100 cursor-pointer transition-all ease-in-out pt-2 pl-0 ${isXs ? "text-xs" : "text-sm"} text-foreground-light-secondary dark:text-foreground-dark-secondary`}
      onClick={async () => {
        const copied = await copyToClipboard(username);
        setIsCopied(copied);

        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      }}
    >
      @{username}
      <Label text={isCopied ? "Copied" : "Copy"} />
      <CommonIcon
        label={isCopied ? "copy_check" : "copy"}
        className={`${isXs ? "size-4 ml-1" : "size-4.5 ml-2"}`}
      />
    </p>
  );
};

export default function Profile(): ReactNode {
  const { authNUser } = useAuth(),
    { theme } = useTheme();
  return (
    <div className="text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <div className="h-40 w-full -mb-15 relative overflow-hidden cursor-pointer">
        <div className="absolute top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-2 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="edit" weight="thin" className="size-6" />
            <Label text="Edit" />
          </button>
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
      </div>
      <div className="px-18">
        <div className="flex flex-col">
          <div className="flex flex-wrap items-start gap-6 bg-background-light-base/50 dark:bg-background-dark-base/50 flex-1 p-4 pl-0 pt-0 backdrop-blur-md rounded-t-3xl rounded-tl-[55px]">
            <div className="flex-none bg-background-light-base dark:bg-background-dark-base p-3 rounded-full rounded-bl-none">
              <div className="relative cursor-pointer">
                {authNUser?.profileImage && (
                  <img
                    src={authNUser?.profileImage}
                    alt="profile-image"
                    loading="lazy"
                    className="size-22 rounded-full"
                  />
                )}

                <div className="absolute -right-5 -bottom-5 bg-background-light-base dark:bg-background-dark-base rounded-full p-2">
                  <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                    <CommonIcon label="edit" weight="thin" className="size-6" />
                    <Label text="Edit" />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-2">
                <UsernameHolder username={authNUser?.username} />
                <p className="text-6xl">
                  {authNUser?.firstName}{" "}
                  <span className="font-semibold gradient bg-clip-text text-transparent">
                    {authNUser?.lastName}
                  </span>
                </p>
                {authNUser?.title && (
                  <p className="font-semibold text-xl">{authNUser?.title}</p>
                )}
                {authNUser?.address && (
                  <p className="flex items-center text-sm gap-2 justify-start text-foreground-light-secondary dark:text-foreground-dark-secondary">
                    <CommonIcon
                      label="location_alt"
                      weight="thin"
                      className="size-5.5"
                    />
                    {authNUser?.address}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-6 p-4 pl-34 flex-wrap">
            {authNUser?.bio && (
              <div className="flex flex-col gap-2 min-w-80">
                <h2 className="font-semibold">About</h2>
                <p>{authNUser?.bio}</p>
              </div>
            )}
            <div className="max-w-100 min-w-80 flex flex-col gap-2">
              <h2 className="font-semibold">Contact Info</h2>
              <div className="flex flex-col gap-2">
                {authNUser?.contactInfo.emails.map((email) => (
                  <a
                    href={`mailto:${email}`}
                    key={email}
                    target="_blank"
                    className="group text-sm relative flex hover:underline items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                  >
                    <CommonIcon
                      label="envelope_alt"
                      weight="base"
                      className="size-5 opacity-60"
                    />

                    {email}
                    <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r from-transparent to-background-light-base dark:to-background-dark-base w-full flex justify-end items-center">
                      <CommonIcon
                        label="arrow_out_up_right_circle"
                        className="size-6"
                        weight="thin"
                      />
                    </div>
                  </a>
                ))}
                {authNUser?.contactInfo.phoneNumbers.map((phoneNumber) => (
                  <a
                    href={`tel:${phoneNumber}`}
                    key={phoneNumber}
                    target="_blank"
                    className="group text-sm relative flex items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                  >
                    <CommonIcon
                      label="phone"
                      weight="base"
                      className="size-5 opacity-60"
                    />
                    {formatPhoneNumber(phoneNumber)}

                    <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r from-transparent to-background-light-base dark:to-background-dark-base w-full flex justify-end items-center">
                      <CommonIcon
                        label="arrow_out_up_right_circle"
                        className="size-6"
                        weight="thin"
                      />
                    </div>
                  </a>
                ))}
                {authNUser?.contactInfo.socialLinks.map((socialLink) => (
                  <a
                    href={socialLink.url}
                    key={socialLink.url}
                    target="_blank"
                    className="group text-sm relative flex items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                  >
                    <SocialIcon
                      platform={socialLink.type}
                      className="size-5 opacity-60"
                      weight="base"
                    />
                    <p className="line-clamp-1">{socialLink.url}</p>

                    <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r from-transparent to-background-light-base dark:to-background-dark-base w-full flex justify-end items-center">
                      <CommonIcon
                        label="arrow_out_up_right_circle"
                        className="size-6"
                        weight="thin"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
