import type { ReactNode } from "react";
import CommonIcon from "../components/icons/CommonIcon";
import page_not_found_icon from "../assets/images/page_not_found.png";
import { Link } from "react-router-dom";

export default function NotFound(): ReactNode {
  return (
    <div className="bg-background-light-base dark:bg-background-dark-base h-dvh flex items-center justify-center flex-col">
      <img src={page_not_found_icon} alt="page-not-found" className="size-80" />
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-foreground-light-primary text-2xl font-semibold">
          Oops, we lost this page
        </h2>
        <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary max-w-120 text-center">
          Looks like the page you're looking for isn't here anymore. Let's get
          you back on track.
        </p>
      </div>
      <Link
        to={"/app"}
        className="w-fit gap-4 mt-8 items-center group flex gradient p-1.5 px-4 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
      >
        <CommonIcon
          label="chevron_right"
          weight="bold"
          soild={true}
          className="rotate-180 size-8 translate-x-1 group-hover:-translate-x-2 transition-all ease-in-out"
        />
        <p>Take me home</p>
      </Link>
    </div>
  );
}
