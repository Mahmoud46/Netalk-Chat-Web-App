import { useRef, useState } from "react";
import Label from "../common/Label";
import CommonIcon from "../icons/CommonIcon";
import { Link } from "react-router-dom";
import { ToggleButton } from "../../pages/AppearanceSettings";
import { calculateAge, capitalize } from "../../utils/helpers";
import { formatDate, getDateSixteenYearsAgo } from "../../utils/format";
import type { Gender } from "../../types";

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
    <div className="space-x-4 relative flex font-semibold items-center justify-between text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
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
      <div className="flex gap-2 w-full">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
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

export const LoginForm = () => {
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <form className="flex flex-col gap-8">
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

export const SignupForm = () => {
  const [part, setPart] = useState<number>(1);

  const [firstName, setFirstName] = useState<string>(""),
    [lastName, setLastName] = useState<string>("");
  const [birthdate, setBirthdate] = useState<string>(getDateSixteenYearsAgo());
  const [gender, setGender] = useState<Gender>("male");
  const [emailPhone, setEmailPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [title, setTitle] = useState<string>("New Voice");
  const [bio, setBio] = useState<string>(
    "Just joined Netalk! Excited to connect and join the conversation.",
  );

  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {part == 1 && (
          <>
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
            <EmailPhoneInputFiled
              emailPhone={emailPhone}
              setEmailPhone={setEmailPhone}
            />
            <PasswordInputField password={password} setPassword={setPassword} />
          </>
        )}
        {part == 2 && (
          <>
            <TitleInputField title={title} setTitle={setTitle} />
            <BioInputField bio={bio} setBio={setBio} />
          </>
        )}
      </div>

      <div className="flex items-center w-full gap-2">
        {part == 2 && (
          <button
            type="button"
            className="p-2.5 flex items-center justify-center rounded-3xl cursor-pointer transition-all ease-in-out hover:scale-105 flex-1 gap-2 bg-background-light-secondary dark:bg-background-dark-secondary"
            onClick={() => setPart(1)}
          >
            <CommonIcon
              label="chevron_right"
              weight="thin"
              className="rotate-180 size-6.5"
            />
            Previous
          </button>
        )}
        <button
          type="submit"
          className="gradient p-2.5 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 flex-1 gap-2"
          onClick={(e) => {
            e.preventDefault();

            setPart((prev) => (prev == 1 ? 2 : 1));
          }}
        >
          {part == 1 ? "Next" : "Submit"}
        </button>
      </div>
    </form>
  );
};
