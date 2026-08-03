import type { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { AuthMode } from "../types";

import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import { useTheme } from "../hooks";
import { BrandIcon, BrandWordmark } from "../components/icons/BrandIcon";
import React, { Suspense } from "react";
import Loader from "../components/common/Loader";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";

const LoginForm = React.lazy(() =>
    import("../components/layout/Form").then((module) => ({
      default: module.LoginForm,
    })),
  ),
  SignupForm = React.lazy(() =>
    import("../components/layout/Form").then((module) => ({
      default: module.SignupForm,
    })),
  );

// yourapp.com/auth?mode=signup
export default function Auth(): ReactNode {
  const [searchParams] = useSearchParams();
  const authMode: AuthMode = (searchParams.get("mode") ?? "login") as AuthMode;
  const { theme } = useTheme();

  return (
    <div
      className={`flex ${authMode == "login" ? "flex-row-reverse" : "flex-row"} items-center h-dvh transition-all ease-in-out bg-background-light-base dark:bg-background-dark-base`}
    >
      <div className="flex-1 h-full relative">
        <img
          src={theme == "light" ? default_cover : default_cover_dark}
          alt="cover-image"
          className={`size-full object-cover ${authMode == "login" ? "rounded-l-4xl" : "rounded-r-4xl"}`}
          loading="lazy"
        />
        <div className="absolute top-0 h-full max-h-full overflow-auto p-12 flex flex-col gap-10">
          <div className="flex items-center gap-4">
            <BrandIcon theme={theme} className="size-8" />
            <BrandWordmark className="h-13" />
          </div>
          <div className="text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col gap-4">
            <h1 className="text-4xl font-semibold">
              {authMode == "login"
                ? "Missed you around here!"
                : "Your seat at the table is ready."}
            </h1>
            <p
              className={`backdrop-blur-2xl ${theme == "dark" ? "bg-black/10" : "bg-white/10"}`}
            >
              {authMode == "login"
                ? "Your crew is waiting. Log in and jump right back into the chat."
                : "Create your Netalk account and join thousands of people sharing ideas, chatting, and connecting every day."}
            </p>
          </div>
        </div>
        {/* Signup and login arrows  */}
        <Link
          className={`z-20 absolute aspect-square rounded-full bg-background-light-base dark:bg-background-dark-base top-1/2 -translate-y-1/2 p-3 ${authMode == "login" ? "-left-10" : "-right-10"} flex items-center justify-center`}
          to={authMode == "login" ? "/auth?mode=signup" : "/auth?mode=login"}
        >
          <button className="relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-9 transition-all ease-in-out ${authMode == "signup" && "rotate-180"}`}
            />
            <Label text={authMode == "login" ? "Sign up" : "Log in"} />
          </button>
        </Link>
      </div>
      <div
        className={`flex-1 h-full text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col p-12 gap-16 z-10`}
      >
        <div className="">
          <h2 className="flex items-center text-2xl font-semibold">
            {authMode == "signup" ? "Get started on" : "Log in into"}{" "}
            <BrandWordmark className="h-11 mx-1" />
          </h2>
          {authMode == "login" && (
            <p className="text-sm">
              Don't have an account?{" "}
              <Link
                className="hover:text-foreground-light-primary transition-all hover:underline"
                to={"/auth?mode=signup"}
              >
                Sign up
              </Link>
            </p>
          )}
          {authMode == "signup" && (
            <p className="text-sm">
              Already have an account?{" "}
              <Link
                className="hover:text-foreground-light-primary transition-all hover:underline"
                to={"/auth?mode=login"}
              >
                Log in
              </Link>
            </p>
          )}
        </div>
        <Suspense fallback={<Loader />}>
          {authMode == "login" && <LoginForm />}
          {authMode == "signup" && <SignupForm />}
        </Suspense>
      </div>
    </div>
  );
}
