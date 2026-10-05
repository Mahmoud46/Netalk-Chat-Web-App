import { useEffect, useRef, useState, type ReactNode } from "react";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";
import { ToggleButton } from "../../pages/AppearanceSettings";
import {
  calculateAge,
  capitalize,
  checkPasswordStrength,
} from "../../utils/helpers";
import {
  formatDate,
  maskEmailAddress,
  maskPhoneNumber,
} from "../../utils/format";
import type { Gender, PasswordStrength, SignupScreenStep } from "../../types";
import SocialIcon from "../icons/SocialIcon";
import { SIGNUP_ONBOARDING_STEPS } from "../../config/navigation";

import default_cover from "../../assets/images/default_profile_cover.jpg";
import default_cover_dark from "../../assets/images/default_profile_cover_dark.jpg";
import { useAuth, useTheme } from "../../hooks";
import { Avatar } from "../icons/Avatar";
import { BrandWordmark } from "../icons/BrandIcon";
import { OTP_AVAILABLE_TIME_IN_MIN, OTP_LENGTH } from "../../config/auth";

const SignupOnboardingScreensMap = ({
  screen = "credentials",
  setSignupStep,
}: {
  screen?: SignupScreenStep;
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}): ReactNode => {
  switch (screen) {
    case "credentials":
      return <SignupCredentialsForm />;
    case "otp_verification":
      return <SignupOTPVerificationForm setSignupStep={setSignupStep} />;
    case "personal_details":
      return <SignupPersonalDetailsForm setSignupStep={setSignupStep} />;
    case "media_assets":
      return <SignupMediaAssetsForm setSignupStep={setSignupStep} />;
    case "account_created":
      return <SignupCompletedForm />;
  }
};

const passwordStrengthBgColorMap: Record<PasswordStrength, string> = {
  very_weak: "bg-red-600 w-1/6",
  weak: "bg-orange-500 w-1/3",
  fair: "bg-yellow-500 w-1/2",
  moderate: "bg-lime-500 w-2/3",
  good: "bg-green-500 w-5/6",
  strong: "bg-emerald-500 w-full",
};

const EmailPhoneInputFiled = ({
  emailAddress,
  phoneNumber,
  setEmailAddress,
  setPhoneNumber,
  verifyWithPhoneNumber,
  setVerifyWithPhoneNumber,
}: {
  emailAddress: string;
  phoneNumber: string;
  setEmailAddress: (emailAddress: string) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  verifyWithPhoneNumber: boolean;
  setVerifyWithPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const toggleUseEmailPhone = () => setVerifyWithPhoneNumber((prev) => !prev);
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="email-phone"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        {verifyWithPhoneNumber ? "Phone number" : "Email address"}
      </label>
      {verifyWithPhoneNumber && (
        <input
          type="tel"
          name="email-phone"
          id="email-phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value.trim())}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
          placeholder="Enter your phone number (Ex: +20 10 1234 5678)"
          pattern="^\+?[1-9]\d{7,14}$"
          title="Invalid phone number"
          required
        />
      )}
      {!verifyWithPhoneNumber && (
        <input
          type="email"
          name="email-phone"
          id="email-phone"
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value.trim())}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
          placeholder="Enter email address (Ex: you@example.com)"
          required
        />
      )}
      <p className="text-xs">
        Prefer your {verifyWithPhoneNumber ? "email address" : "phone number"}?{" "}
        <button
          type="button"
          className="cursor-pointer text-foreground-dark-primary hover:underline"
          onClick={toggleUseEmailPhone}
        >
          Switch here
        </button>
        .
      </p>
    </div>
  );
};

const PasswordInputField = ({
  password,
  setPassword,
  isSignup = true,
}: {
  password: string;
  setPassword: (password: string) => void;
  isSignup?: boolean;
}) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [passwordStrengthLevel, setPasswordStrengthLevel] =
    useState<PasswordStrength>(checkPasswordStrength(password));

  const passwordChecks = [
    {
      label: "8+ characters",
      valid: password.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Numbers",
      valid: /\d/.test(password),
    },
    {
      label: "Symbols",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="password"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        Password
      </label>
      <div className="flex items-center relative">
        {isSignup && (
          <input
            type={isHidden ? "password" : "text"}
            name="password"
            id="password"
            className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
            placeholder="Enter your password"
            required
            minLength={8}
            pattern="^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
            title="Password must be at least 8 characters and contain an uppercase letter, a number, and a symbol."
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrengthLevel(checkPasswordStrength(e.target.value));
            }}
          />
        )}
        {!isSignup && (
          <input
            type={isHidden ? "password" : "text"}
            name="password"
            id="password"
            className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordStrengthLevel(checkPasswordStrength(e.target.value));
            }}
          />
        )}
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
      {isSignup && (
        <>
          <p className="w-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 h-1 rounded-3xl flex">
            <span
              className={`${passwordStrengthBgColorMap[passwordStrengthLevel]} h-full transition-all ease-in-out rounded-3xl`}
            ></span>
          </p>

          <ul className="flex gap-4 flex-wrap">
            {passwordChecks.map((passCheck) => (
              <li
                key={passCheck.label}
                className={`text-xs ${passCheck.valid ? "text-foreground-light-success" : "text-foreground-light-third dark:text-foreground-dark-secondary"}`}
              >
                {passCheck.label}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const RememberMeInputField = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleRememberMe = () => setIsActive((prev) => !prev);

  return (
    <div className="space-x-4 relative flex font-semibold items-center text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <ToggleButton isActive={isActive} action={toggleRememberMe} />
      <input
        type="checkbox"
        name="remember-me"
        id="remember-me"
        className="absolute opacity-0 cursor-pointer"
        onChange={toggleRememberMe}
        checked={isActive}
      />
      <label htmlFor="remember-me" className="cursor-pointer">
        Remember me
      </label>
    </div>
  );
};

const NameInputField = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
}: {
  firstName: string;
  setFirstName: (firstName: string) => void;
  lastName: string;
  setLastName: (lastName: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        Full Name
      </p>
      <div className="flex gap-2 w-full flex-wrap">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          required
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          required
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
      </div>
    </div>
  );
};

const BirthdateInputField = ({
  birthdate,
  setBirthdate,
}: {
  birthdate: string;
  setBirthdate: (birthdate: string) => void;
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-col gap-1.5 flex-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <CommonIcon label="party" weight="thin" className="size-6.5" />
          <p>Birthday</p>
        </div>
        <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
          {calculateAge(birthdate)} years old
        </p>
      </div>
      <div
        className="flex cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
        onClick={() => dateInputRef.current?.showPicker()}
      >
        <CommonIcon label="calendar_star" weight="thin" className="size-6" />
        <p>{formatDate(new Date(birthdate ?? ""))}</p>
      </div>

      <input
        type="date"
        value={birthdate.split("T")[0]}
        onChange={(e) => setBirthdate(e.target.value)}
        ref={dateInputRef}
        className="hidden"
      />
    </div>
  );
};

const GenderInputField = ({
  gender,
  setGender,
}: {
  gender: Gender;
  setGender: (gender: Gender) => void;
}) => {
  return (
    <div
      className="flex flex-col justify-end h-full gap-1.5
    "
    >
      <p className="text-end text-sm font-semibold">{capitalize(gender)}</p>
      <div className="flex relative items-center rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-1 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <button
          type="button"
          className={`z-5 relative group flex cursor-pointer items-center w-full rounded-full p-2 ${gender == "female" && "hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"}`}
          onClick={() => setGender("male")}
        >
          <CommonIcon
            label="male"
            soild={gender == "male"}
            weight="thin"
            className="size-6 transition-all ease-in-out"
          />
          {gender == "female" && <Label text="Male" isSide={true} />}
        </button>

        <button
          type="button"
          className={`z-2 relative group flex cursor-pointer items-center w-full rounded-full p-2 ${gender == "male" && "hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"}`}
          onClick={() => setGender("female")}
        >
          <CommonIcon
            label="female"
            soild={gender == "female"}
            weight="thin"
            className="size-6 transition-all ease-in-out"
          />
          {gender == "male" && <Label text="Female" isSide={true} />}
        </button>

        <span
          className={`absolute rounded-full bg-background-dark-primary w-10 top-1 translate-x-0 ${gender == "female" && "translate-x-10"} aspect-square  transition-all ease-in-out`}
        ></span>
      </div>
    </div>
  );
};

const AddressField = ({
  address,
  setAddress,
}: {
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <label htmlFor="address">Address</label>
      </div>

      <div className="relative">
        <CommonIcon
          label="location_alt"
          weight="thin"
          className="size-6 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          className="flex items-center gap-2 w-full rounded-full pl-11 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
    </div>
  );
};

const TitleInputField = ({
  title,
  setTitle,
}: {
  title: string;
  setTitle: (emailPhone: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <label
        htmlFor="title"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        Title
      </label>
      <input
        type="text"
        name="title"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value.trim())}
        className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        placeholder="Title e.g., Digital Creator / Tech Enthusiast"
      />
    </div>
  );
};

const BioInputField = ({
  bio,
  setBio,
}: {
  bio: string;
  setBio: (bio: string) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      <label
        htmlFor="bio"
        className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
      >
        Bio
      </label>
      <textarea
        id="bio"
        placeholder="Tell the Netalk community a bit about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={6}
        className="w-full resize-none bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
      />
    </div>
  );
};

const useCountdown = (minutes: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const formattedTime = `${String(mins).padStart(2, "0")}:${String(
    secs,
  ).padStart(2, "0")}`;

  return {
    timeLeft: formattedTime,
    isActive: timeLeft > 0,
  };
};

const OTPInputField = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    // Only allow one digit
    const digit = value.replace(/\D/g, "").slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = Array(OTP_LENGTH).fill("");

    pasted.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    const nextIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          required
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="bg-background-light-surface-2 max-w-15 flex-none text-center dark:bg-background-dark-surface-2 p-3 rounded-full text-base text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
          aria-label={`OTP digit ${index + 1}`}
          placeholder="0"
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
};

const SignupCredentialsForm = () => {
  const { credentials } = useAuth();
  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <EmailPhoneInputFiled
            emailAddress={credentials.emailAddress}
            phoneNumber={credentials.phoneNumber}
            setEmailAddress={credentials.setEmailAddress}
            setPhoneNumber={credentials.setPhoneNumber}
            verifyWithPhoneNumber={credentials.verifyWithPhoneNumber}
            setVerifyWithPhoneNumber={credentials.setVerifyWithPhoneNumber}
          />
          <PasswordInputField
            password={credentials.password}
            setPassword={credentials.setPassword}
          />
          <div className="flex justify-between text-sm items-center">
            <RememberMeInputField />
          </div>
        </div>

        <button
          type="submit"
          className="gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
        >
          Start Onboarding
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="flex text-xs font-semibold items-center gap-2 w-full opacity-80">
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
          OR
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
        </div>
        <div className="flex items-center justify-center gap-2 w-full flex-col md:flex-row">
          <button
            type="button"
            className="cursor-pointer text-start rounded-3xl flex-none w-full justify-center md:justify-start md:flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            <SocialIcon platform="google" className="w-6" />
            <p>
              Login with <span className="font-semibold">Google</span>
            </p>
          </button>
          <button
            type="button"
            className="cursor-pointer text-start rounded-3xl flex-none w-full justify-center md:justify-start md:flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            <SocialIcon platform="microsoft" className="w-6" />
            <p>
              Login with <span className="font-semibold">Microsoft</span>
            </p>
          </button>
        </div>
      </div>

      <p className="text-sm text-center">
        By signing up to create an account I accept Netalk's{" "}
        <Link
          to={"/terms_conditions_and_privacy_policy"}
          className="text-foreground-dark-primary hover:underline"
        >
          Terms & Conditions and Privacy Policy
        </Link>
      </p>
    </>
  );
};

const SignupPersonalDetailsForm = ({
  setSignupStep,
}: {
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { personalDetails } = useAuth();
  return (
    <>
      <div className="">
        <h2 className="flex items-center text-2xl font-semibold">
          A Little About You
        </h2>
        <p className="text-sm">
          Share some basic details about yourself to personalize your profile.
          You’re in control of what you share and can change it whenever you
          want.
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <NameInputField
            firstName={personalDetails.firstName}
            setFirstName={personalDetails.setFirstName}
            lastName={personalDetails.lastName}
            setLastName={personalDetails.setLastName}
          />
          <div className="flex items-center gap-2">
            <BirthdateInputField
              birthdate={personalDetails.birthdate}
              setBirthdate={personalDetails.setBirthdate}
            />
            <GenderInputField
              gender={personalDetails.gender}
              setGender={personalDetails.setGender}
            />
          </div>
          <AddressField
            address={personalDetails.address}
            setAddress={personalDetails.setAddress}
          />
          <TitleInputField
            title={personalDetails.title}
            setTitle={personalDetails.setTitle}
          />
          <BioInputField
            bio={personalDetails.bio}
            setBio={personalDetails.setBio}
          />
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="p-2.5 group flex items-center justify-center rounded-3xl cursor-pointer transition-all ease-in-out flex-1 gap-2 bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
            onClick={() => setSignupStep(1)}
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="rotate-180 size-7 group-hover:-translate-x-2 transition-all ease-in-out"
            />
            Previous
          </button>
          <button
            type="submit"
            className="p-2.5 flex group items-center justify-center rounded-3xl cursor-pointer transition-all ease-in-out flex-1 gap-2 bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            Next
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="size-7 group-hover:translate-x-2 transition-all ease-in-out"
            />
          </button>
        </div>
      </div>
    </>
  );
};

const SignupOTPVerificationForm = ({
  setSignupStep,
}: {
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { credentials } = useAuth();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const { timeLeft, isActive } = useCountdown(OTP_AVAILABLE_TIME_IN_MIN);
  useEffect(() => {
    credentials.setOtp(parseInt(otp.join("")));
  }, [credentials, otp]);
  return (
    <>
      <div className="">
        <h2 className="flex items-center text-2xl font-semibold">
          Let's verify your{" "}
          {credentials.verifyWithPhoneNumber ? "phone number" : "email address"}
        </h2>
        <p className="text-sm">
          We sent a 6-digit verification code to{" "}
          {credentials.verifyWithPhoneNumber
            ? maskPhoneNumber(credentials.phoneNumber)
            : maskEmailAddress(credentials.emailAddress)}
          .
        </p>
      </div>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6 py-20">
          <OTPInputField otp={otp} setOtp={setOtp} />
          {isActive && (
            <p className="text-center text-sm">
              Code expires in <span className="font-semibold">{timeLeft}</span>
            </p>
          )}
          {!isActive && (
            <p className="text-center text-sm">
              Didn't receive the code?{" "}
              <button
                type="button"
                className="font-semibold hover:underline text-foreground-dark-primary cursor-pointer"
              >
                Resend code
              </button>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
        >
          Verify
        </button>

        <p className="text-sm">
          Wrong{" "}
          {credentials.verifyWithPhoneNumber ? "phone number" : "email address"}
          ?{" "}
          <button
            type="button"
            className="font-semibold hover:underline text-foreground-dark-primary cursor-pointer"
            onClick={() => setSignupStep(0)}
          >
            Change it
          </button>
        </p>
      </div>
    </>
  );
};

const SignupMediaAssetsForm = ({
  setSignupStep,
}: {
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { theme } = useTheme(),
    { personalDetails, mediaAssets } = useAuth();

  const coverImageInputRef = useRef<HTMLInputElement | null>(null);
  const profileImageInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        name="cover-image"
        ref={coverImageInputRef}
        onChange={(e) => {
          if (e.target.files) {
            mediaAssets.setPreviewCoverImage(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
              const base64Img = reader.result;
              mediaAssets.setCoverImage(base64Img as string);
            };
          }
        }}
      />

      <input
        type="file"
        accept="image/*"
        className="hidden"
        name="profile-image"
        ref={profileImageInputRef}
        onChange={(e) => {
          if (e.target.files) {
            mediaAssets.setPreviewProfileImage(e.target.files[0]);
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = async () => {
              const base64Img = reader.result;
              mediaAssets.setProfileImage(base64Img as string);
            };
          }
        }}
      />

      <div className="">
        <h2 className="flex items-center text-2xl font-semibold">
          Make Your Profile Yours
        </h2>
        <p className="text-sm">
          Personalize your profile with a profile picture and cover image. These
          visuals help others recognize you and make your profile feel more
          personal.
        </p>
      </div>
      <div className="flex flex-col gap-22">
        <div className="relative h-40 w-full">
          {/* Cover image */}
          {mediaAssets.previewCoverImage ? (
            <img
              src={URL.createObjectURL(mediaAssets.previewCoverImage)}
              alt="cover-image"
              className="w-full rounded-3xl object-cover h-full"
            />
          ) : (
            <img
              src={theme == "dark" ? default_cover_dark : default_cover}
              alt="participant-profile-cover"
              loading="lazy"
              className="w-full rounded-3xl object-cover h-full"
            />
          )}
          <div className="absolute top-0 right-0 bg-background-light-base dark:bg-background-dark-base p-1.5 rounded-bl-3xl top-right-cornered-btn [--shadow-color:#fff] dark:[--shadow-color:#0f1115]">
            <button
              type="button"
              className="relative group cursor-pointer z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              onClick={() => coverImageInputRef.current?.click()}
            >
              <CommonIcon label="edit" weight="thin" className="size-6" />
              <Label text="Edit" />
            </button>
          </div>

          {/* Avatar image */}
          <div
            className={`absolute -bottom-16.5 left-1/2 -translate-x-1/2 p-3 rounded-full transition-all ease-in-out bg-background-light-base dark:bg-background-dark-base profile-image-set-input-viewer-form [--shadow-color:#fff] dark:[--shadow-color:#0f1115]`}
          >
            <div className="size-30 rounded-full overflow-hidden relative">
              {mediaAssets.previewProfileImage ? (
                <img
                  src={URL.createObjectURL(mediaAssets.previewProfileImage)}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <Avatar
                  age={calculateAge(personalDetails.birthdate)}
                  gender={personalDetails.gender}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="bg-background-light-base dark:bg-background-dark-base p-1.5 absolute rounded-full bottom-0 right-0 transition-all ease-in-out">
              <button
                type="button"
                className="relative group cursor-pointer z-30 p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
                onClick={() => profileImageInputRef.current?.click()}
              >
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button
            type="button"
            className="p-2.5 group flex items-center justify-center rounded-3xl cursor-pointer transition-all ease-in-out flex-1 gap-2 bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
            onClick={() => setSignupStep(2)}
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="rotate-180 size-7 group-hover:-translate-x-2 transition-all ease-in-out"
            />
            Previous
          </button>
          <button
            type="submit"
            className="p-2.5 flex group items-center justify-center rounded-3xl cursor-pointer transition-all ease-in-out flex-1 gap-2 bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            Next
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="size-7 group-hover:translate-x-2 transition-all ease-in-out"
            />
          </button>
        </div>
      </div>
    </>
  );
};

const SignupCompletedForm = () => {
  const { mediaAssets, personalDetails } = useAuth();
  return (
    <>
      <div className="flex flex-col gap-7 items-center">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          Welcome to <BrandWordmark className="h-12" />,
        </h2>
        <div className="p-2 w-fit rounded-full gradient shadow-glow [--shadow-color:#fd5b5d] relative flex items-center justify-center">
          <div className="size-35 rounded-full overflow-hidden">
            {mediaAssets.previewProfileImage ? (
              <img
                src={URL.createObjectURL(mediaAssets.previewProfileImage)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <Avatar
                age={calculateAge(personalDetails.birthdate)}
                gender={personalDetails.gender}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="absolute bg-background-light-base dark:bg-background-dark-base p-1 rounded-full flex items-center justify-center top-2 right-2">
            <CommonIcon label="sparkles" weight="thin" className="size-7.5" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-3xl w-fit font-semibold gradient bg-clip-text text-transparent">
            {personalDetails.firstName}!
          </h1>
          <p className="text-center">
            Your account is all set. Let’s start connecting!
          </p>
        </div>
        <div className="flex gap-2 items-center w-full">
          <button
            type="submit"
            className="w-full gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
          >
            Get Started
          </button>
        </div>
      </div>
    </>
  );
};

export const LoginForm = () => {
  const { credentials, login } = useAuth();
  return (
    <form
      className="flex flex-col gap-8 w-full bg-background-light-base dark:bg-background-dark-base"
      onSubmit={login}
    >
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <EmailPhoneInputFiled
            emailAddress={credentials.emailAddress}
            phoneNumber={credentials.phoneNumber}
            setEmailAddress={credentials.setEmailAddress}
            setPhoneNumber={credentials.setPhoneNumber}
            verifyWithPhoneNumber={credentials.verifyWithPhoneNumber}
            setVerifyWithPhoneNumber={credentials.setVerifyWithPhoneNumber}
          />
          <PasswordInputField
            password={credentials.password}
            setPassword={credentials.setPassword}
            isSignup={false}
          />
          <div className="flex justify-between text-sm items-center">
            <RememberMeInputField />
            <Link
              to={"/"}
              className="text-foreground-light-primary transition-all hover:underline font-semibold"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          className="gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
        >
          Log in
        </button>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="flex text-xs font-semibold items-center gap-2 w-full opacity-80">
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
          OR
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
        </div>
        <div className="flex items-center justify-center gap-2 w-full flex-col md:flex-row">
          <button
            type="button"
            className="cursor-pointer text-start rounded-3xl flex-none w-full justify-center md:justify-start md:flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            <SocialIcon platform="google" className="w-6" />
            <p>
              Login with <span className="font-semibold">Google</span>
            </p>
          </button>
          <button
            type="button"
            className="cursor-pointer text-start rounded-3xl flex-none w-full justify-center md:justify-start md:flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary"
          >
            <SocialIcon platform="microsoft" className="w-6" />
            <p>
              Login with <span className="font-semibold">Microsoft</span>
            </p>
          </button>
        </div>
      </div>
      <p className="text-xs text-center flex md:hidden w-full">
        © 2026 Netalk. Made for better conversations.
      </p>
    </form>
  );
};

export const SignupForm = ({
  signupStep,
  setSignupStep,
}: {
  signupStep: number;
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { startOnboarding, signup, CompleteOnboarding, verifyOTP } = useAuth();

  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    let verified: boolean = false;
    const stepScreen: SignupScreenStep =
      SIGNUP_ONBOARDING_STEPS[signupStep] ?? "credentials";

    switch (stepScreen) {
      case "credentials":
        verified = await startOnboarding();
        break;
      case "otp_verification":
        verified = await verifyOTP(); // OTP verification function
        break;
      case "personal_details":
        verified = true; // Continuing creating
        break;
      case "media_assets":
        verified = await signup();
        break;

      case "account_created":
        CompleteOnboarding();
        break;
    }

    if (verified) {
      setSignupStep((prev) =>
        prev == SIGNUP_ONBOARDING_STEPS.length + 1 ? 1 : prev + 1,
      );
    }
  };
  return (
    <>
      <form
        className="flex flex-col gap-8 pb-13 bg-background-light-base dark:bg-background-dark-base"
        onSubmit={submitForm}
      >
        <SignupOnboardingScreensMap
          screen={SIGNUP_ONBOARDING_STEPS[signupStep]}
          setSignupStep={setSignupStep}
        />
        <p className="text-xs text-center flex md:hidden w-full">
          © 2026 Netalk. Made for better conversations.
        </p>
      </form>
    </>
  );
};
