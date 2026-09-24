import type { ReactNode } from "react";
import type { Attachment } from "../../types";
import CommonIcon from "../icons/CommonIcon";
import FileIcon from "../icons/FileIcon";
import ChatIcon from "../icons/ChatIcon";

export const AttachmentCard = ({
  attachment,
}: {
  attachment: Attachment;
}): ReactNode => {
  const fileExtension = attachment.name.split(".").at(-1),
    isFile = attachment.type == "file" || attachment.type == "audio";
  const openFile = () => window.open(attachment.url, "_blank");

  return (
    <div
      className={`flex items-center gap-2 cursor-pointer transition-all ease-in-out ${isFile && "p-2 bg-background-light-secondary/50 dark:bg-background-dark-secondary/50 hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary"} rounded-xl`}
      onClick={openFile}
    >
      {isFile && (
        <>
          <FileIcon type={fileExtension ?? ""} />

          <div className="text-foreground-light-secondary dark:text-foreground-dark-secondary text-sm">
            <p>{attachment.name}</p>
            <p className="text-xs">{attachment.size}</p>
          </div>
        </>
      )}

      {attachment.type == "image" && (
        <img src={attachment.url} loading="lazy" className="rounded-xl" />
      )}
    </div>
  );
};

export const MediaFile = ({
  mediaFile,
  className = "",
}: {
  mediaFile: Attachment;
  className?: string;
}): ReactNode => {
  const openFile = () => window.open(mediaFile.url, "_blank");
  return (
    <div
      className={`group relative w-full h-full rounded-3xl overflow-hidden cursor-pointer ${className}`}
      onClick={openFile}
    >
      {mediaFile.type == "image" && (
        <>
          <img
            src={mediaFile.url}
            alt={mediaFile.name}
            loading="lazy"
            className="size-full object-cover group-hover:scale-125 transition-all ease-in-out"
          />
          <div className="absolute opacity-0 hover:opacity-100 transition-all ease-in-out w-full h-full flex items-center justify-center bg-background-light-surface-3/50 dark:bg-background-dark-surface-3/50 top-0 backdrop-blur-lg rounded-3xl">
            <CommonIcon
              label="maximize"
              className="size-6 scale-0 group-hover:scale-100 transition-all ease-in-out duration-300"
            />
          </div>
        </>
      )}
      {mediaFile.type == "video" && (
        <>
          <img
            src={mediaFile.url}
            alt={mediaFile.name}
            loading="lazy"
            className="size-full object-cover group-hover:scale-125 transition-all ease-in-out"
          />
          <div className="absolute opacity-0 hover:opacity-100 transition-all ease-in-out w-full h-full flex items-center justify-center bg-background-light-surface-3/50 dark:bg-background-dark-surface-3/50 top-0 backdrop-blur-lg rounded-3xl">
            <ChatIcon
              label="play_circle_alt"
              className="size-6 scale-0 group-hover:scale-100 transition-all ease-in-out duration-300"
            />
          </div>
          <div className="absolute bottom-2 left-2 p-1 px-2 bg-background-light-surface-3/50 dark:bg-background-dark-surface-3/50 text-black dark:text-white backdrop-blur-3xl text-xs rounded-3xl">
            {mediaFile.duration}
          </div>
        </>
      )}
    </div>
  );
};
