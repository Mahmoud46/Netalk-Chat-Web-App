import type { ReactNode } from "react";

const Label = ({
  text,
  isSide = false,
  sideDirection = "r",
}: {
  text: string;
  isSide?: boolean;
  sideDirection?: "r" | "l";
}): ReactNode => {
  return (
    <div
      className={`absolute scale-0 group-hover:scale-100 transition-all ease-in-out w-fit z-10 bg-background-light-base dark:bg-background-dark-base
    p-2 rounded-lg text-foreground-light-secondary dark:text-foreground-dark-secondary ${isSide && (sideDirection == "r" ? "top-1/3 left-3/4" : "top-1/3 right-3/4")}`}
    >
      <p className="text-xs">{text}</p>
    </div>
  );
};

export default Label;
