import { useRef, useState } from "react";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";
import { ToggleButton } from "../../pages/AppearanceSettings";
import { calculateAge, capitalize } from "../../utils/helpers";
import { formatDate, getDateSixteenYearsAgo } from "../../utils/format";
import type { Gender } from "../../types";
import SocialIcon from "../icons/SocialIcon";
import { SIGNUP_ONBOARDING_STEPS } from "../../config/navigation";

const EmailPhoneInputFiled = ({
  emailPhone,
  setEmailPhone,
}: {
  emailPhone: string;
  setEmailPhone: (emailPhone: string) => void;
}) => {
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
        value={emailPhone}
        onChange={(e) => setEmailPhone(e.target.value.trim())}
        className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        placeholder="Email address or phone number"
        required
      />
    </div>
  );
};

const PasswordInputField = ({
  password,
  setPassword,
}: {
  password: string;
  setPassword: (password: string) => void;
}) => {
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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
const TermsAndPrivacyAccept = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleAcceptTerms = () => setIsActive((prev) => !prev);

  return (
    <div className="space-x-4 relative flex font-semibold items-center text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <ToggleButton isActive={isActive} action={toggleAcceptTerms} />
      <input
        type="checkbox"
        name="accept-terms-privacy"
        id="accept-terms-privacy"
        className="absolute opacity-0 cursor-pointer"
        onChange={toggleAcceptTerms}
        checked={isActive}
        required
      />
      <label htmlFor="accept-terms-privacy" className="cursor-pointer">
        Agree to{" "}
        <Link to={"/"} className="underline hover:text-foreground-dark-primary">
          Terms & Privacy
        </Link>
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
      <div className="flex gap-2 w-full">
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
          <Label text="Male" isSide={true} />
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
          <Label text="Female" isSide={true} />
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
        <p>Address</p>
      </div>

      <div className="relative">
        <CommonIcon
          label="location_alt"
          weight="thin"
          className="size-6 absolute top-1/2 left-3 -translate-y-1/2"
        />
        <input
          type="text"
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
      <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        Bio
      </p>
      <textarea
        placeholder="Tell the Netalk community a bit about yourself..."
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        rows={6}
        className="w-full resize-none bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
      />
    </div>
  );
};

const SignupCredentials = () => {
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <EmailPhoneInputFiled
            emailPhone={emailPhone}
            setEmailPhone={setEmailPhone}
          />
          <PasswordInputField password={password} setPassword={setPassword} />
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
          Start Onboarding
        </button>

        <TermsAndPrivacyAccept />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="flex text-xs font-semibold items-center gap-2 w-full opacity-80">
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
          OR
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
        </div>
        <div className="flex items-center justify-center gap-6 w-full">
          <button className="cursor-pointer rounded-3xl flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary">
            <SocialIcon platform="google" className="w-6" />
            <p className="text-start">
              Sign Up with <span className="font-semibold">Google</span>
            </p>
          </button>
          <button className="cursor-pointer rounded-3xl flex-1 flex items-center justify-start gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary">
            <SocialIcon platform="microsoft" className="w-6" />
            <p className="text-start">
              Sign Up with <span className="font-semibold">Microsoft</span>
            </p>
          </button>
        </div>
      </div>
    </>
  );
};

const SignupPersonalDetails = ({
  setSignupStep,
}: {
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const [firstName, setFirstName] = useState<string>(""),
    [lastName, setLastName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>(getDateSixteenYearsAgo());
  const [gender, setGender] = useState<Gender>("male");
  const [address, setAddress] = useState<string>("");
  const [title, setTitle] = useState<string>("New Voice");
  const [bio, setBio] = useState<string>(
    "Just joined Netalk! Excited to connect and join the conversation.",
  );
  return (
    <>
      <h2 className="flex items-center text-2xl font-semibold">
        Personal Details
      </h2>
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <NameInputField
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
          />
          <div className="flex items-center gap-2">
            <BirthdateInputField
              birthdate={birthdate}
              setBirthdate={setBirthdate}
            />
            <GenderInputField gender={gender} setGender={setGender} />
          </div>
          <AddressField address={address} setAddress={setAddress} />
          <TitleInputField title={title} setTitle={setTitle} />
          <BioInputField bio={bio} setBio={setBio} />
        </div>
        <div className="flex gap-6 items-center">
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

const SignupMediaAssets = ({
  setSignupStep,
}: {
  setSignupStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <>
      <h2 className="flex items-center text-2xl font-semibold">Media Assets</h2>
      <div className="flex flex-col gap-7">
        {/* Body */}
        <div className="flex gap-6 items-center">
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

export const LoginForm = () => {
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-7">
        <div className="flex flex-col gap-6">
          <EmailPhoneInputFiled
            emailPhone={emailPhone}
            setEmailPhone={setEmailPhone}
          />
          <PasswordInputField password={password} setPassword={setPassword} />
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

        <TermsAndPrivacyAccept />
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-6">
        <div className="flex text-xs font-semibold items-center gap-2 w-full opacity-80">
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
          OR
          <span className="flex-1 h-px bg-foreground-light-third dark:bg-foreground-dark-secondary"></span>
        </div>
        <div className="flex items-center justify-center gap-6 w-full">
          <button className="cursor-pointer rounded-3xl flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary">
            <SocialIcon platform="google" className="w-6" />
            <p>
              Login with <span className="font-semibold">Google</span>
            </p>
          </button>
          <button className="cursor-pointer rounded-3xl flex-1 flex items-center gap-4 p-3 text-sm transition-all ease-in-out bg-background-light-secondary/50 hover:bg-background-light-secondary dark:bg-background-dark-secondary/50 hover:dark:dark:bg-background-dark-secondary">
            <SocialIcon platform="microsoft" className="w-6" />
            <p>
              Login with <span className="font-semibold">Microsoft</span>
            </p>
          </button>
        </div>
      </div>
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
  const submitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSignupStep((prev) =>
      prev == SIGNUP_ONBOARDING_STEPS.length ? 1 : prev + 1,
    );
  };
  return (
    <>
      <form className="flex flex-col gap-8 pb-13" onSubmit={submitForm}>
        {signupStep == 1 && <SignupCredentials />}
        {signupStep == 2 && (
          <SignupPersonalDetails setSignupStep={setSignupStep} />
        )}
        {signupStep == 3 && <SignupMediaAssets setSignupStep={setSignupStep} />}
      </form>
    </>
  );
};
