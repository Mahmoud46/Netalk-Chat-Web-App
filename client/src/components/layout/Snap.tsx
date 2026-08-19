import type { ReactNode } from "react";
import type { Attachment, Contact } from "../../types";
import React, { useState } from "react";
import CommonIcon from "../icons/CommonIcon";
import { formatPhoneNumber } from "../../utils/format";
import SocialIcon from "../icons/SocialIcon";
import Label from "../common/Label";
import { copyToClipboard } from "../../utils/helpers";

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const copyText = async () => {
    const copied = await copyToClipboard(text);
    setIsCopied(copied);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      onClick={copyText}
      type="button"
      className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
    >
      <CommonIcon
        label={isCopied ? "copy_check" : "copy"}
        className="size-5.5"
        weight="thin"
      />
      <Label text={isCopied ? "Copied" : "Copy"} />
    </button>
  );
};

const MediaFile = React.lazy(() =>
    import("../common/Attachment").then((module) => ({
      default: module.MediaFile,
    })),
  ),
  AttachmentCard = React.lazy(() =>
    import("../common/Attachment").then((module) => ({
      default: module.AttachmentCard,
    })),
  );

export const SharedMedia = ({
  sharedMedia,
}: {
  sharedMedia: Attachment[];
}): ReactNode => {
  return (
    <div className="flex gap-2 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <h2 className="font-semibold text-sm">Shared Media</h2>
      <div className="flex gap-1.5 overflow-x-auto">
        {sharedMedia.map((media) => (
          <MediaFile mediaFile={media} key={media.fileId} />
        ))}
      </div>
    </div>
  );
};

export const SharedFiles = ({
  sharedFiles,
}: {
  sharedFiles: Attachment[];
}): ReactNode => {
  return (
    <div className="flex gap-2 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <h2 className="font-semibold text-sm">Shared Files</h2>
      <div className="flex gap-1.5 overflow-x-auto flex-col">
        {sharedFiles.map((file) => (
          <AttachmentCard attachment={file} key={file.fileId} />
        ))}
      </div>
    </div>
  );
};

export const ProfilePanelContactInfo = ({
  contactInfo,
}: {
  contactInfo: Contact;
}) => (
  <div className="flex gap-2 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
    <h2 className="font-semibold text-sm">Contact Info</h2>
    <div className="flex flex-col">
      {contactInfo.emails.map((email) => (
        <div
          key={email}
          className="group/card cursor-pointer text-sm relative flex items-center gap-3 transition-all ease-in-out w-full max-w-full hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2 py-1.5 rounded-3xl hover:pl-1.5"
        >
          <CommonIcon
            label="envelope_alt"
            weight="thin"
            className="size-5.5 opacity-60"
          />
          <p className="flex-1 line-clamp-1">{email}</p>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 scale-0 pointer-events-none transition-all ease-in-out group-hover/card:scale-100 group-hover/card:pointer-events-auto  bg-background-light-surface-2 dark:bg-background-dark-surface-2 w-fit flex justify-end items-center rounded-3xl p-0.5 h-fit">
            <CopyButton text={email} />
            <a
              href={`mailto:${email}`}
              target="_blank"
              className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon
                label="paper_plane"
                className="size-5.5"
                weight="thin"
              />
              <Label text="Mail" />
            </a>
          </div>
        </div>
      ))}
      {contactInfo.phoneNumbers.map((phoneNumber) => (
        <div
          key={phoneNumber}
          className="group/card cursor-pointer text-sm relative flex items-center gap-3 transition-all ease-in-out w-full max-w-full hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2 py-1.5 rounded-3xl hover:pl-1.5"
        >
          <CommonIcon
            label="phone"
            weight="thin"
            className="size-5.5 opacity-60"
          />
          <p className="flex-1 line-clamp-1">
            {formatPhoneNumber(phoneNumber)}
          </p>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 scale-0 transition-all ease-in-out pointer-events-none group-hover/card:scale-100 group-hover/card:pointer-events-auto  bg-background-light-surface-2 dark:bg-background-dark-surface-2 w-fit flex justify-end items-center rounded-3xl p-0.5 h-fit">
            <CopyButton text={phoneNumber} />
            <a
              href={`tel:${phoneNumber}`}
              target="_blank"
              className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon label="phone" className="size-5.5" weight="thin" />
              <Label text="Call" />
            </a>
          </div>
        </div>
      ))}
      {contactInfo.socialLinks.map((socialLink) => (
        <div
          key={socialLink.url}
          className="group/card cursor-pointer text-sm relative flex items-center gap-3 transition-all ease-in-out w-full max-w-full hover:bg-background-light-surface-2 hover:dark:bg-background-dark-surface-2 py-1.5 rounded-3xl hover:pl-1.5"
        >
          <SocialIcon
            platform={socialLink.type}
            className="size-5.5 opacity-60"
            weight="thin"
          />
          <p className="line-clamp-1 flex-1">{socialLink.url}</p>

          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 scale-0 transition-all ease-in-out group-hover/card:scale-100 group-hover/card:pointer-events-auto  bg-background-light-surface-2 dark:bg-background-dark-surface-2 w-fit flex justify-end items-center rounded-3xl p-0.5 h-fit">
            <CopyButton text={socialLink.url} />
            <a
              href={socialLink.url}
              target="_blank"
              className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
            >
              <CommonIcon
                label="arrow_out_up_right_circle"
                className="size-5.5"
                weight="thin"
              />
              <Label text="View" />
            </a>
          </div>
        </div>
      ))}
    </div>
  </div>
);
