import type { ReactNode } from "react";
import type { Attachment } from "../../types";
import CommonIcon from "../icons/CommonIcon";
import FileIcon from "../icons/FileIcon";

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
}: {
  mediaFile: Attachment;
}): ReactNode => {
  const openFile = () => window.open(mediaFile.url, "_blank");
  return (
    <div
      className="group relative rounded-xl aspect-square size-30 cursor-pointer group overflow-hidden"
      onClick={openFile}
    >
      {mediaFile.type == "image" && (
        <>
          <img
            src={mediaFile.url}
            alt={mediaFile.name}
            loading="lazy"
            className="size-full object-cover rounded-xl group-hover:scale-125 transition-all ease-in-out"
          />
          <div className="absolute right-0 scale-0 transition-all ease-in-out group-hover:scale-100 w-full h-full flex items-center justify-center bg-background-light-surface-3/80 dark:bg-background-dark-surface-3/80 top-0">
            <CommonIcon
              label="arrow_out_up_right_circle"
              className="size-6"
              weight="thin"
            />
          </div>
        </>
      )}
    </div>
  );
};
