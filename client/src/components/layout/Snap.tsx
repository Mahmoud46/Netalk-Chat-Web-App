import type { ReactNode } from "react";
import type { Attachment } from "../../types";
import { lazy } from "react";

const MediaFile = lazy(() =>
    import("../common/Attachment").then((module) => ({
      default: module.MediaFile,
    })),
  ),
  AttachmentCard = lazy(() =>
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
    <div className="flex gap-3 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <h2 className="font-semibold text-sm sticky top-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 pt-3 w-full z-20">
        Shared Media{" "}
        <span className="opacity-50 text-xs">({sharedMedia.length})</span>
      </h2>
      <div className="grid grid-cols-2 auto-rows-[100px] gap-1.5">
        {sharedMedia.map((media, i) => {
          return (
            <MediaFile
              mediaFile={media}
              key={media.fileId}
              className={
                (i % 6 === 0 || i % 6 === 5) && i + 2 < sharedMedia.length
                  ? "row-span-2"
                  : ""
              }
            />
          );
        })}
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
    <div className="flex relative gap-3 flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <h2 className="font-semibold text-sm sticky top-0 bg-background-light-surface-3 dark:bg-background-dark-surface-3 pt-3 w-full z-10">
        Shared Files{" "}
        <span className="opacity-50 text-xs">({sharedFiles.length})</span>
      </h2>
      <div className="flex flex-col">
        {sharedFiles.map((file) => (
          <AttachmentCard
            attachment={file}
            key={file.fileId}
            withMessage={false}
          />
        ))}
      </div>
    </div>
  );
};
