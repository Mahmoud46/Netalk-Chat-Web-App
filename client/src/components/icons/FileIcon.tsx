import fig_file_icon from "../../assets/icons/files/fig.png";
import txt_file_icon from "../../assets/icons/files/txt.png";
import psd_file_icon from "../../assets/icons/files/psd.png";
import ai_file_icon from "../../assets/icons/files/ai.png";
import aep_file_icon from "../../assets/icons/files/aep.png";
import sketch_file_icon from "../../assets/icons/files/sketch.png";
import cdr_file_icon from "../../assets/icons/files/cdr.png";
import c4d_file_icon from "../../assets/icons/files/c4d.png";
import blend_file_icon from "../../assets/icons/files/blend.png";

import type { FileFormat } from "../../types";

// export default function FileIcon({
//   type,
//   className = "h-12",
// }: {
//   type: string;
//   className?: string;
// }) {
//   return (
//     <div className="relative aspect-square h-12">
//       <ChatIcon label="file" weight="thin" className="size-full" />

//       <p className="text-[8px] absolute bottom-1 font-bold left-1/2 -translate-1/2">
//         {type.toUpperCase()}
//       </p>
//     </div>
//   );
// }

export const FileIcon = ({
  fileFormat,
  className = "",
}: {
  fileFormat: FileFormat;
  className?: string;
}) => {
  switch (fileFormat) {
    case "fig":
      return (
        <img
          src={fig_file_icon}
          alt="fig-file"
          loading="lazy"
          className={className}
        />
      );
    case "txt":
      return (
        <img
          src={txt_file_icon}
          alt="txt-file"
          loading="lazy"
          className={className}
        />
      );
    case "psd":
      return (
        <img
          src={psd_file_icon}
          alt="psd-file"
          loading="lazy"
          className={className}
        />
      );
    case "ai":
      return (
        <img
          src={ai_file_icon}
          alt="ai-file"
          loading="lazy"
          className={className}
        />
      );
    case "aep":
      return (
        <img
          src={aep_file_icon}
          alt="aep-file"
          loading="lazy"
          className={className}
        />
      );
    case "sketch":
      return (
        <img
          src={sketch_file_icon}
          alt="sketch-file"
          loading="lazy"
          className={className}
        />
      );
    case "cdr":
      return (
        <img
          src={cdr_file_icon}
          alt="cdr-file"
          loading="lazy"
          className={className}
        />
      );
    case "c4d":
      return (
        <img
          src={c4d_file_icon}
          alt="c4d-file"
          loading="lazy"
          className={className}
        />
      );
    case "blend":
      return (
        <img
          src={blend_file_icon}
          alt="blend-file"
          loading="lazy"
          className={className}
        />
      );

    default:
      return <></>;
  }
};

export default FileIcon;
