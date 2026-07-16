import type { ReactNode } from "react";
import type { Attachment } from "../../types";
import React from "react";

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
