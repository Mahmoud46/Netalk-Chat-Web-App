import type { ReactNode } from "react";
import loader from "../../assets/icons/loader.png";

export default function Loader(): ReactNode {
  return (
    <div className="flex-1 flex justify-center items-center h-full w-full">
      <img src={loader} loading="lazy" className="size-10 animate-spin" />
    </div>
  );
}
