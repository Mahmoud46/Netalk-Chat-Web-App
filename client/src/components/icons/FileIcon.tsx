import fig_file_icon from "../../assets/icons/files/fig.png";
import txt_file_icon from "../../assets/icons/files/txt.png";
import pdf_file_icon from "../../assets/icons/files/pdf.png";
import psd_file_icon from "../../assets/icons/files/psd.png";
import ai_file_icon from "../../assets/icons/files/ai.png";
import aep_file_icon from "../../assets/icons/files/aep.png";
import sketch_file_icon from "../../assets/icons/files/sketch.png";
import cdr_file_icon from "../../assets/icons/files/cdr.png";
import c4d_file_icon from "../../assets/icons/files/c4d.png";
import blend_file_icon from "../../assets/icons/files/blend.png";
import image_file_icon from "../../assets/icons/files/image.png";
import audio_file_icon from "../../assets/icons/files/audio.png";
import video_file_icon from "../../assets/icons/files/video.png";
import document_file_icon from "../../assets/icons/files/document.png";
import presentation_file_icon from "../../assets/icons/files/presentation.png";
import spreadsheet_file_icon from "../../assets/icons/files/spreadsheet.png";
import zip_file_icon from "../../assets/icons/files/zip.png";
import rar_file_icon from "../../assets/icons/files/rar.png";
import windows_file_icon from "../../assets/icons/files/windows.png";
import apple_file_icon from "../../assets/icons/files/apple.png";
import android_file_icon from "../../assets/icons/files/android.png";
import html_file_icon from "../../assets/icons/files/html.png";
import css_file_icon from "../../assets/icons/files/css.png";
import js_file_icon from "../../assets/icons/files/js.png";
import ts_file_icon from "../../assets/icons/files/ts.png";
import java_file_icon from "../../assets/icons/files/java.png";
import json_file_icon from "../../assets/icons/files/json.png";

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
    case "pdf":
      return (
        <img
          src={pdf_file_icon}
          alt="pdf-file"
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
    case "jpg":
    case "jpeg":
    case "gif":
    case "ico":
    case "png":
    case "svg":
    case "tiff":
    case "webp":
      return (
        <img
          src={image_file_icon}
          alt="image-file"
          loading="lazy"
          className={className}
        />
      );

    case "mp3":
    case "wav":
      return (
        <img
          src={audio_file_icon}
          alt="audio-file"
          loading="lazy"
          className={className}
        />
      );
    case "avi":
    case "mov":
    case "mp4":
    case "mpg":
      return (
        <img
          src={video_file_icon}
          alt="video-file"
          loading="lazy"
          className={className}
        />
      );
    case "doc":
    case "docx":
    case "odt":
    case "pages":
    case "rtf":
      return (
        <img
          src={document_file_icon}
          alt="document-file"
          loading="lazy"
          className={className}
        />
      );
    case "key":
    case "odp":
    case "pot":
    case "potx":
    case "pps":
    case "ppsx":
    case "ppt":
    case "pptx":
      return (
        <img
          src={presentation_file_icon}
          alt="presentation-file"
          loading="lazy"
          className={className}
        />
      );
    case "csv":
    case "ods":
    case "xls":
    case "xlsm":
    case "xlsx":
    case "xlt":
    case "xltx":
      return (
        <img
          src={spreadsheet_file_icon}
          alt="spreadsheet-file"
          loading="lazy"
          className={className}
        />
      );
    case "zip":
      return (
        <img
          src={zip_file_icon}
          alt="compressed-file"
          loading="lazy"
          className={className}
        />
      );
    case "rar":
      return (
        <img
          src={rar_file_icon}
          alt="compressed-file"
          loading="lazy"
          className={className}
        />
      );

    case "exe":
      return (
        <img
          src={windows_file_icon}
          alt="windows-file"
          loading="lazy"
          className={className}
        />
      );
    case "dmg":
      return (
        <img
          src={apple_file_icon}
          alt="apple-file"
          loading="lazy"
          className={className}
        />
      );
    case "apk":
      return (
        <img
          src={android_file_icon}
          alt="android-file"
          loading="lazy"
          className={className}
        />
      );
    case "html":
      return (
        <img
          src={html_file_icon}
          alt="html-file"
          loading="lazy"
          className={className}
        />
      );
    case "css":
      return (
        <img
          src={css_file_icon}
          alt="css-file"
          loading="lazy"
          className={className}
        />
      );
    case "js":
      return (
        <img
          src={js_file_icon}
          alt="js-file"
          loading="lazy"
          className={className}
        />
      );
    case "ts":
      return (
        <img
          src={ts_file_icon}
          alt="ts-file"
          loading="lazy"
          className={className}
        />
      );
    case "java":
      return (
        <img
          src={java_file_icon}
          alt="java-file"
          loading="lazy"
          className={className}
        />
      );
    case "json":
      return (
        <img
          src={json_file_icon}
          alt="json-file"
          loading="lazy"
          className={className}
        />
      );
    default:
      return <></>;
  }
};

export default FileIcon;
