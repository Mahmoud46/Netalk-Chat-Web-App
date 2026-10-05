import type { ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import type { AuthMode } from "../types";

import default_cover from "../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../assets/images/default_profile_cover_dark.jpg";
import { useTheme } from "../hooks";
import { BrandIcon, BrandWordmark } from "../components/icons/BrandIcon";
import React, { Suspense, useState } from "react";
import Loader from "../components/common/Loader";
import CommonIcon from "../components/icons/CommonIcon";
import Label from "../components/common/Label";
import { SIGNUP_ONBOARDING_STEPS } from "../config/navigation";

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
  const [signupStep, setSignupStep] = useState<number>(0);

  return (
    <div
      className={`flex flex-col md:flex-row ${authMode == "login" ? "md:flex-row-reverse" : "md:flex-row"} items-center h-dvh transition-all ease-in-out bg-background-light-base dark:bg-background-dark-base`}
    >
      <div
        className={`flex-none md:flex-1 h-fit md:h-full relative ${SIGNUP_ONBOARDING_STEPS[signupStep] != "credentials" && "hidden md:flex"}`}
      >
        <img
          src={theme == "light" ? default_cover : default_cover_dark}
          alt="cover-image"
          className={`size-full object-cover ${authMode == "login" ? "md:rounded-l-4xl" : "md:rounded-r-4xl"}`}
          loading="lazy"
        />
        <div className="backdrop-blur-2xl w-full absolute top-0 h-full max-h-full overflow-auto p-4 md:p-8 xl:p-12 flex flex-col gap-4 md:gap-6 xl:gap-10">
          <div className="flex items-center gap-4">
            <BrandIcon theme={theme} className="size-6 md:size-8" />
            <BrandWordmark className="h-10 md:h-13" />
          </div>
          <div className="flex-1 text-foreground-light-secondary dark:text-foreground-dark-secondary flex flex-col gap-1 md:gap-4">
            <h1 className="text-xl md:text-2xl xl:text-4xl font-semibold">
              {authMode == "login"
                ? "Missed you around here!"
                : "Your seat at the table is ready."}
            </h1>
            <p className={`text-sm md:text-base`}>
              {authMode == "login"
                ? "Your crew is waiting. Log in and jump right back into the chat."
                : "Create your Netalk account and join thousands of people sharing ideas, chatting, and connecting every day."}
            </p>

            {authMode == "signup" && (
              <div className="w-full gap-2 mt-4 flex">
                {SIGNUP_ONBOARDING_STEPS.map((step) => (
                  <span
                    key={step}
                    className={`flex-1 h-2 rounded-3xl transition-all ease-in-out ${step == SIGNUP_ONBOARDING_STEPS[signupStep] ? "bg-background-dark-primary" : "bg-background-dark-surface-2 dark:bg-background-dark-surface-2"}`}
                  ></span>
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-center self-end hidden md:flex text-foreground-light-secondary dark:text-foreground-dark-secondary ">
            © 2026 Netalk. Made for better conversations.
          </p>
        </div>
        {/* Signup and login arrows */}
        <Link
          className={`z-20 hidden md:flex absolute aspect-square rounded-full bg-background-light-base dark:bg-background-dark-base top-1/2 -translate-y-1/2 p-2 ${authMode == "login" ? "-left-8" : "-right-8"} flex items-center justify-center`}
          to={authMode == "login" ? "/auth?mode=signup" : "/auth?mode=login"}
        >
          <button
            className={`relative group cursor-pointer p-1 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out signup-login-middle-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115] ${authMode}`}
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className={`size-9 transition-all ease-in-out ${authMode == "signup" && "rotate-180"}`}
            />
            <Label text={authMode == "login" ? "Signup" : "Login"} />
          </button>
        </Link>
      </div>

      {/* Form */}
      <div className="h-fit flex-none max-md:w-full md:flex-1/6 xl:flex-1 md:h-full text-foreground-light-secondary dark:text-foreground-dark-secondary overflow-auto">
        <div
          className={`flex flex-col w-full p-4 md:px-10 md:py-8 xl:px-20 xxl:px-27 xl:py-13 ${authMode == "signup" ? "gap-4" : "gap-4 md:gap-8"} z-10 max-h-full`}
        >
          {(SIGNUP_ONBOARDING_STEPS[signupStep] == "credentials" ||
            authMode == "login") && (
            <div className="">
              <h2 className="flex items-center text-lg md:text-2xl font-semibold">
                {authMode == "signup" ? "Get started on" : "Log in into"}{" "}
                <BrandWordmark className="h-9 md:h-11 mx-1" />
              </h2>
              {authMode == "login" && (
                <p className="text-sm">
                  Don't have an account?{" "}
                  <Link
                    className="text-foreground-light-primary transition-all hover:underline font-semibold"
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
                    className="text-foreground-light-primary transition-all hover:underline font-semibold"
                    to={"/auth?mode=login"}
                  >
                    Log in
                  </Link>
                </p>
              )}
            </div>
          )}
          <Suspense fallback={<Loader />}>
            {authMode == "login" && <LoginForm />}
            {authMode == "signup" && (
              <SignupForm
                signupStep={signupStep}
                setSignupStep={setSignupStep}
              />
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
