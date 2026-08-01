import { useState } from "react";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";

const EmailPhoneInputFiled = () => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="email-phone"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        Email address or phone number
      </label>
      <input
        type="text"
        name="email-phone"
        id="email-phone"
        className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        placeholder="Email address or phone number"
        required
      />
    </div>
  );
};

const PasswordInputField = () => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="password"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        Password
      </label>
      <div className="flex items-center relative">
        <input
          type={isHidden ? "password" : "text"}
          name="password"
          id="password"
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
          placeholder="Password"
          required
        />
        <button
          type="button"
          className="absolute right-1 top-1 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          onClick={() => setIsHidden((prev) => !prev)}
        >
          <CommonIcon
            label={isHidden ? "eye" : "eye_slash"}
            weight="thin"
            className="size-6"
          />
          <Label text={isHidden ? "Show" : "Hide"} />
        </button>
      </div>
    </div>
  );
};

export const LoginForm = () => {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <EmailPhoneInputFiled />
        <PasswordInputField />
        <div className="flex justify-between text-sm items-center">
          <div className="space-x-2">
            <input
              type="checkbox"
              name="remember-me"
              id="remember-me"
              className="cursor-pointer accent-background-dark-primary"
            />
            <label htmlFor="remember-me" className="cursor-pointer">
              Remember me
            </label>
          </div>
          <Link
            to={"/"}
            className="hover:text-foreground-light-primary transition-all hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <button
        type="submit"
        className="gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105"
      >
        Log in
      </button>
    </form>
  );
};
