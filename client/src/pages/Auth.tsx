import type { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { AuthMode } from "../types";

import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import { useTheme } from "../hooks";
import { BrandIcon, BrandWordmark } from "../components/icons/BrandIcon";
import React, { Suspense } from "react";
import Loader from "../components/common/Loader";

const LoginForm = React.lazy(() =>
  import("../components/layout/Form").then((module) => ({
    default: module.LoginForm,
  })),
);

// yourapp.com/auth?mode=signup
export default function Auth(): ReactNode {
  const [searchParams] = useSearchParams();
  const authMode: AuthMode = (searchParams.get("mode") ?? "login") as AuthMode;
  const { theme } = useTheme();

  return (
    <div
      className={`flex ${authMode == "login" ? "flex-row-reverse" : "flex-row"} items-center h-dvh transition-all ease-in-out`}
    >
      <div className="flex-1 h-full relative">
        <img
          src={theme == "light" ? default_cover : default_cover_dark}
          alt="cover-image"
          className="size-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-0 h-full max-h-full overflow-auto p-8 flex flex-col gap-10">
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
      </div>
      <div className="flex-1 h-full bg-background-light-base dark:bg-background-dark-base text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col p-10 gap-10">
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
        </Suspense>
      </div>
    </div>
  );
}
