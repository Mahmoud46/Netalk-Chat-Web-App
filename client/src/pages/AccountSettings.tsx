import { lazy, useEffect, useRef, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import { useAuth } from "../hooks";
import { formatDate } from "../utils/format";
import { calculateAge } from "../utils/helpers";
import Label from "../components/common/Label";
import CommonIcon from "../components/icons/CommonIcon";

const ContactInfoDropList = lazy(() =>
  import("../components/common/DropList").then((module) => ({
    default: module.ContactInfoDropList,
  })),
);

const NameField = () => {
  const { authNUser } = useAuth();
  const [firstName, setFirstName] = useState<string>(""),
    [lastName, setLastName] = useState<string>(""),
    [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    const spreadData = async () => {
      if (authNUser?.firstName) setFirstName(authNUser?.firstName);
      if (authNUser?.lastName) setLastName(authNUser?.lastName);
    };

    spreadData();
  }, [authNUser?.firstName, authNUser?.lastName]);
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        Full Name
      </p>
      <div className="flex gap-2 w-full relative">
        <input
          type="text"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
            setShowSaveButton(e.target.value.trim() != authNUser?.firstName);
          }}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        <input
          type="text"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
            setShowSaveButton(e.target.value.trim() != authNUser?.lastName);
          }}
          className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex-1 p-3 rounded-full text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />

        {showSaveButton && (
          <button className="absolute -top-1/4 -translate-y-1/2 -right-6 group self-end cursor-pointer  transition-all ease-in-out p-2 bg-background-light-base dark:bg-background-dark-base rounded-full">
            <div className="bg-background-light-surface-2 dark:bg-background-dark-surface-2 cursor-pointers p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary">
              <CommonIcon label="save" weight="thin" className="size-6" />
              <Label text="Save" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

const TitleField = () => {
  const { authNUser } = useAuth();
  const [title, setTitle] = useState<string>(""),
    [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    const spreadData = async () => {
      if (authNUser?.title) setTitle(authNUser?.title);
    };

    spreadData();
  }, [authNUser?.title]);
  return (
    <div className="w-full flex flex-col gap-1.5">
      <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        Title
      </p>
      <div className="relative">
        <input
          placeholder="Title (Optional)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setShowSaveButton(e.target.value.trim() != authNUser?.title);
          }}
          className="w-full resize-none bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        {showSaveButton && (
          <button className="absolute bg-background-light-surface-2 dark:bg-background-dark-surface-2 top-1/2 -translate-y-1/2 right-0.5 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="save" weight="thin" className="size-6" />
            <Label text="Save" />
          </button>
        )}
      </div>
    </div>
  );
};

const BioField = () => {
  const { authNUser } = useAuth();
  const [bio, setBio] = useState<string>(""),
    [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    const spreadData = async () => {
      if (authNUser?.bio) setBio(authNUser?.bio);
    };

    spreadData();
  }, [authNUser?.bio]);
  return (
    <div className="w-full flex flex-col gap-1.5">
      <p className="font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        Bio
      </p>
      <div className="relative">
        <textarea
          placeholder="Bio"
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            setShowSaveButton(e.target.value.trim() != authNUser?.bio);
          }}
          rows={6}
          className="w-full resize-none bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 rounded-3xl text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        {showSaveButton && (
          <button className="absolute bg-background-light-surface-2 dark:bg-background-dark-surface-2 bottom-2 right-2 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="save" weight="thin" className="size-6" />
            <Label text="Save" />
          </button>
        )}
      </div>
    </div>
  );
};

const BirthdateField = () => {
  const { authNUser } = useAuth();
  const [birthdate, setBirthdate] = useState<string>(""),
    [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const spreadData = async () => {
      if (authNUser?.birthdate) setBirthdate(authNUser.birthdate);
    };

    spreadData();
  }, [authNUser?.birthdate]);
  return (
    <div className="w-full flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <p>Birthday</p>
        </div>
        <p className="text-xs text-foreground-light-secondary dark:text-foreground-dark-secondary">
          {calculateAge(birthdate)} years old
        </p>
      </div>
      <div
        className="flex relative cursor-pointer items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary"
        onClick={() => dateInputRef.current?.showPicker()}
      >
        <CommonIcon label="calendar_star" weight="thin" className="size-6" />
        <p>{formatDate(new Date(birthdate ?? ""))}</p>

        {showSaveButton && (
          <button className="absolute top-1/2 bg-background-light-surface-2 dark:bg-background-dark-surface-2 -translate-y-1/2 right-1 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="save" weight="thin" className="size-6" />
            <Label text="Save" />
          </button>
        )}
      </div>

      <input
        type="date"
        value={birthdate.split("T")[0]}
        onChange={(e) => {
          setBirthdate(e.target.value);
          setShowSaveButton(
            authNUser?.birthdate.split("T")[0] !== e.target.value.split("T")[0],
          );
        }}
        ref={dateInputRef}
        className="hidden"
      />
    </div>
  );
};

const AddressField = () => {
  const { authNUser } = useAuth();
  const [address, setAddress] = useState<string>(""),
    [showSaveButton, setShowSaveButton] = useState<boolean>(false);

  useEffect(() => {
    const spreadData = async () => {
      if (authNUser?.address) setAddress(authNUser.address);
    };

    spreadData();
  }, [authNUser?.address]);
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
          onChange={(e) => {
            setAddress(e.target.value);
            setShowSaveButton(e.target.value.trim() != authNUser?.address);
          }}
          placeholder="Address"
          className="flex items-center gap-2 w-full rounded-full pl-11 bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
        />
        {showSaveButton && (
          <button className="absolute bg-background-light-surface-2 dark:bg-background-dark-surface-2 top-1/2 -translate-y-1/2 right-0.5 group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <CommonIcon label="save" weight="thin" className="size-6" />
            <Label text="Save" />
          </button>
        )}
      </div>
    </div>
  );
};

const ContactsInfo = () => {
  const { authNUser } = useAuth();
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleContactInfoList = () => setIsActive((prev) => !prev);
  const isListNotEmpty: boolean = !!(
    authNUser &&
    (authNUser?.contactInfo.emails.length > 0 ||
      authNUser?.contactInfo.phoneNumbers.length > 0 ||
      authNUser?.contactInfo.socialLinks.length > 0)
  );
  return (
    <>
      <div className="flex gap-2 items-center text-sm justify-between text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <div className="flex gap-2 items-center font-semibold">
          <CommonIcon label="form" weight="thin" className="size-6.5" />
          <p>
            Contacts Info{" "}
            {isListNotEmpty && (
              <span className="opacity-50 text-xs ml-2">
                (
                {(authNUser?.contactInfo.emails.length ?? 0) +
                  (authNUser?.contactInfo.phoneNumbers.length ?? 0) +
                  (authNUser?.contactInfo.socialLinks.length ?? 0)}
                )
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center z-30">
          <button
            type="button"
            className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
          >
            <CommonIcon label="plus" weight="thin" className="size-6" />
            <Label text="Add" />
          </button>
          {isListNotEmpty && (
            <button
              type="button"
              className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out"
              onClick={toggleContactInfoList}
            >
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 transition-all ease-in-out ${isActive ? "-rotate-90" : "rotate-90"}`}
              />
              <Label text={isActive ? "Close" : "Open"} />
            </button>
          )}
        </div>
      </div>
      <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary text-xs">
        Adding contact details helps personalize your profile and makes it
        easier for others to reach you. Any contact information you add will be
        used according to your privacy settings, and you can update or remove
        them at any time.
      </p>
      <div className="relative">
        <ContactInfoDropList isActive={isActive} authNUser={authNUser} />
      </div>
    </>
  );
};

export default function AccountSettings() {
  return (
    <>
      <SettingsHeader title="Account Settings" />
      <div className="flex flex-wrap w-full px-3 gap-6">
        <div className="flex flex-col flex-1 gap-4">
          <NameField />
          <TitleField />
          <BioField />
          <BirthdateField />
          <AddressField />
        </div>
        <div className="flex flex-col flex-1">
          <ContactsInfo />
        </div>
      </div>
    </>
  );
}
