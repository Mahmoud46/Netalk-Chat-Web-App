import type { ReactNode } from "react";
import CommonIcon from "../icons/CommonIcon";

export default function Loader(): ReactNode {
  return (
    <div className="flex flex-1 justify-center items-center h-full w-full">
      <CommonIcon
        label="loader_lines_alt"
        className="size-10 animate-spin"
        weight="thin"
      />
    </div>
  );
}
