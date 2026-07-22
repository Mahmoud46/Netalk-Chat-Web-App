import { useAuth, useChat, useTheme } from "../../hooks";
import Label from "../common/Label";

import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";
import { formatPhoneNumber } from "../../utils/format";
import CommonIcon from "../icons/common/CommonIcon";
import SocialIcon from "../icons/social/SocialIcon";

const ContactEntryProfilePanel = () => {
  const { currentContactEntry, contacts, setCurrentContactEntry } = useChat(),
    { theme } = useTheme(),
    { authNUser } = useAuth(),
    isBlocked: boolean =
      authNUser?.blockedUsers.includes(currentContactEntry?._id ?? "") ?? false,
    isMuted: boolean =
      authNUser?.mutedUsers.includes(currentContactEntry?._id ?? "") ?? false;

  const clearCurrentEntryProfile = () => setCurrentContactEntry(null);
  return (
    <>
      {currentContactEntry && (
        <aside className="sticky top-0 w-70 flex flex-col bg-background-light-surface-2 dark:bg-background-dark-surface-2">
          <div className="relative flex flex-col -mb-10">
            <div
              className="size-15 w-full absolute"
              onClick={clearCurrentEntryProfile}
            >
              <div className="absolute top-0 left-0 bg-background-light-base dark:bg-background-dark-base p-2 rounded-br-3xl top-left-cornered-btn  [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
                <button className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                  <CommonIcon
                    label="chevron_right"
                    weight="thin"
                    className="size-7 transition-all ease-in-out"
                  />
                  <Label text="Close" />
                </button>
              </div>
            </div>
            <img
              src={
                currentContactEntry.profileCover ??
                (theme == "dark" ? default_cover_dark : default_cover)
              }
              alt="participant-profile-cover"
              loading="lazy"
              className="w-full rounded-b-3xl"
            />
            <div className="self-center rounded-full p-2 flex justify-center items-center w-fit bg-background-light-surface-2 dark:bg-background-dark-surface-2 -translate-y-10">
              <div className="relative bg-background-light-base dark:bg-background-dark-base p-2 rounded-full">
                {currentContactEntry.profileImage && (
                  <img
                    src={currentContactEntry.profileImage}
                    alt="profile-image"
                    loading="lazy"
                    className="size-20 rounded-full"
                  />
                )}
                {currentContactEntry.isActive && (
                  <span className="absolute flex items-center size-5 aspect-square bg-background-light-base dark:bg-background-dark-base justify-center rounded-full bottom-1.5 right-1.5">
                    <span className="bg-background-dark-success size-3.5 aspect-square rounded-full"></span>
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col justify-center p-4 -translate-y-13 gap-1">
              <p className="text-center font-bold text-base text-foreground-light-secondary dark:text-foreground-dark-secondary line-clamp-1">
                {contacts[currentContactEntry._id ?? ""]}
              </p>
              <div className="flex flex-col gap-1">
                {currentContactEntry.bio && (
                  <p className="text-center text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary line-clamp-1">
                    {currentContactEntry.bio}
                  </p>
                )}
                {currentContactEntry.address && (
                  <p className="text-xs flex items-center gap-2 justify-center text-foreground-light-secondary dark:text-foreground-dark-secondary">
                    <CommonIcon
                      label="location_alt"
                      weight="thin"
                      className="size-5"
                    />
                    {currentContactEntry.address}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="bg-background-light-surface-3 dark:bg-background-dark-surface-3 rounded-t-3xl flex flex-col transition-all ease-in-out">
            <div className="flex items-center w-fit bg-background-light-surface-2 dark:bg-background-dark-surface-2 self-center p-3 -translate-y-6 rounded-b-3xl relative profile-main-buttons-container [--shadow-color:#f9f1ff] dark:[--shadow-color:#16181d]">
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon label="edit" weight="thin" className="size-6.5" />
                <Label text="Edit" />
              </button>
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon
                  label="user_minus"
                  weight="thin"
                  className="size-6.5"
                />
                <Label text="Delete" />
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
          <div className="flex-1 overflow-auto bg-background-light-surface-3 dark:bg-background-dark-surface-3 flex flex-col transition-all ease-in-out">
            <div className="h-full overflow-y-auto px-3 py-3 flex flex-col gap-6">
              <div className="flex gap-2 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
                <h2 className="font-semibold text-sm">Contact Info</h2>
                <div className="flex flex-col gap-2">
                  {currentContactEntry?.contactInfo.emails.map((email) => (
                    <a
                      href={`mailto:${email}`}
                      key={email}
                      target="_blank"
                      className="group text-sm relative flex hover:underline items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                    >
                      <CommonIcon
                        label="envelope_alt"
                        weight="thin"
                        className="size-6 opacity-60"
                      />

                      {email}
                      <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r to-background-light-surface-3 dark:to-background-dark-surface-3 w-full flex justify-end items-center">
                        <CommonIcon
                          label="arrow_out_up_right_circle"
                          className="size-6"
                          weight="thin"
                        />
                      </div>
                    </a>
                  ))}
                  {currentContactEntry?.contactInfo.phoneNumbers.map(
                    (phoneNumber) => (
                      <a
                        href={`tel:${phoneNumber}`}
                        key={phoneNumber}
                        target="_blank"
                        className="group text-sm relative flex items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                      >
                        <CommonIcon
                          label="phone"
                          weight="thin"
                          className="size-6 opacity-60"
                        />
                        {formatPhoneNumber(phoneNumber)}

                        <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r from-transparent to-background-light-surface-3 dark:to-background-dark-surface-3 w-full flex justify-end items-center">
                          <CommonIcon
                            label="arrow_out_up_right_circle"
                            className="size-6"
                            weight="thin"
                          />
                        </div>
                      </a>
                    ),
                  )}
                  {currentContactEntry?.contactInfo.socialLinks.map(
                    (socialLink) => (
                      <a
                        href={socialLink.url}
                        key={socialLink.url}
                        target="_blank"
                        className="group text-sm relative flex items-center gap-3 transition-all ease-in-out w-fit max-w-full line-clamp-1"
                      >
                        <SocialIcon
                          platform={socialLink.type}
                          className="size-5 opacity-60"
                          weight="thin"
                        />
                        <p className="line-clamp-1 flex-1">{socialLink.url}</p>

                        <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 bg-linear-to-r to-background-light-surface-3 dark:to-background-dark-surface-3 w-full flex justify-end items-center">
                          <CommonIcon
                            label="arrow_out_up_right_circle"
                            className="size-6"
                            weight="thin"
                          />
                        </div>
                      </a>
                    ),
                  )}
                </div>
              </div>
              <div className="sticky bottom-0 w-full flex justify-center items-center h-50">
                <div className="flex items-center bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-full shadow-lg dark:shadow-neutral-900/50">
                  <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                    <CommonIcon
                      label="paper_plane"
                      weight="thin"
                      className="size-6.5"
                    />
                    <Label text="Chat" />
                  </button>

                  <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                    <CommonIcon
                      label="phone"
                      weight="thin"
                      className="size-6.5"
                    />
                    <Label text="Call" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ContactEntryProfilePanel;
