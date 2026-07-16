import type { ReactNode } from "react";
import type { FileType } from "../../../types";

import file_general_icon from "../../../assets/icons/file_general.png";
import file_figma_icon from "../../../assets/icons/file_figma.png";
import file_pdf_icon from "../../../assets/icons/file_pdf.png";
import file_audio_icon from "../../../assets/icons/file_audio.png";
import file_zip_icon from "../../../assets/icons/file_zip.png";
import file_docx_icon from "../../../assets/icons/file_docx.png";
import file_xlxs_icon from "../../../assets/icons/file_xlsx.png";

const FileSpeciedIcon = ({
  extension,
  className = "",
}: {
  extension?: string;
  className?: string;
}): ReactNode => {
  switch (extension) {
    case "fig":
      return <img src={file_figma_icon} loading="lazy" className={className} />;
    case "pdf":
      return <img src={file_pdf_icon} loading="lazy" className={className} />;
    case "zip":
      return <img src={file_zip_icon} loading="lazy" className={className} />;
    case "docx":
      return <img src={file_docx_icon} loading="lazy" className={className} />;
    case "xlsx":
      return <img src={file_xlxs_icon} loading="lazy" className={className} />;

    default:
      return (
        <img src={file_general_icon} loading="lazy" className={className} />
      );
  }
};

export const FileIcon = ({
  type,
  extension,
  className = "",
}: {
  type?: FileType;
  extension?: string;
  className?: string;
}): ReactNode => {
  switch (type) {
    case "audio":
      return <img src={file_audio_icon} loading="lazy" className={className} />;

    default:
      return <FileSpeciedIcon extension={extension} className={className} />;
  }
};
