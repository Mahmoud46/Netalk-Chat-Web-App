import { useEffect, useRef, useState } from "react";
import { SettingsHeader } from "../components/common/Header";
import { useAuth } from "../hooks";
import { formatDate, formatPhoneNumber } from "../utils/format";
import { calculateAge } from "../utils/helpers";

import Label from "../components/common/Label";
import SocialIcon from "../components/icons/SocialIcon";
import CommonIcon from "../components/icons/CommonIcon";

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
      <div className="flex gap-2 w-full">
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
      </div>
      {showSaveButton && (
        <button className="relative group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="save" weight="thin" className="size-6" />
          <Label text="Save" />
        </button>
      )}
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
        <button className="relative group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="save" weight="thin" className="size-6" />
          <Label text="Save" />
        </button>
      )}
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
        <button className="relative group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="save" weight="thin" className="size-6" />
          <Label text="Save" />
        </button>
      )}
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
        onChange={(e) => {
          setBirthdate(e.target.value);
          setShowSaveButton(
            authNUser?.birthdate.split("T")[0] !== e.target.value.split("T")[0],
          );
        }}
        ref={dateInputRef}
        className="hidden"
      />

      {showSaveButton && (
        <button className="relative group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="save" weight="thin" className="size-6" />
          <Label text="Save" />
        </button>
      )}
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
        <CommonIcon label="location_alt" weight="thin" className="size-6.5" />
        <p>Address</p>
      </div>
      <input
        type="text"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
          setShowSaveButton(e.target.value.trim() != authNUser?.address);
        }}
        placeholder="Address"
        className="flex items-center gap-2 w-full rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 p-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary focus:outline-none focus:ring-2 focus:ring-background-light-primary/50 dark:focus:ring-background-light-primary/90 transition-all"
      />

      {showSaveButton && (
        <button className="relative group self-end cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="save" weight="thin" className="size-6" />
          <Label text="Save" />
        </button>
      )}
    </div>
  );
};

const ContactsInfo = () => {
  const { authNUser } = useAuth();
  return (
    <>
      <div className="flex gap-2 items-center text-sm justify-between text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <div className="flex gap-2 items-center font-semibold">
          <CommonIcon label="form" weight="thin" className="size-6.5" />
          <p>Contacts Info</p>
        </div>

        <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
          <CommonIcon label="plus" weight="thin" className="size-6" />
          <Label text="Add" />
        </button>
      </div>
      <div className="flex flex-col text-foreground-light-secondary dark:text-foreground-dark-secondary">
        {authNUser?.contactInfo.emails.map((email) => (
          <div
            key={email}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full p-0 px-3 pr-1 hover:py-1 rounded-3xl group/card hover:bg-background-light-surface-2 dark:hover:bg-background-dark-surface-2 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="envelope_alt"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />

              <p className="line-clamp-1 flex-1">{email}</p>
            </div>
            <div className="flex items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out">
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out">
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.phoneNumbers.map((phoneNumber) => (
          <div
            key={phoneNumber}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full p-0 px-3 pr-1 hover:py-1 rounded-3xl group/card hover:bg-background-light-surface-2 dark:hover:bg-background-dark-surface-2 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <CommonIcon
                label="phone"
                weight="thin"
                className="size-6 flex-none opacity-60"
              />
              <p className="line-clamp-1 flex-1">
                {formatPhoneNumber(phoneNumber)}
              </p>
            </div>
            <div className="flex items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out">
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out">
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
        {authNUser?.contactInfo.socialLinks.map((socialLink) => (
          <div
            key={socialLink.url}
            className="text-sm flex justify-between items-center gap-2 transition-all ease-in-out w-full p-0 px-3 pr-1 hover:py-1 rounded-3xl group/card hover:bg-background-light-surface-2 dark:hover:bg-background-dark-surface-2 cursor-pointer"
          >
            <div className="flex gap-3 items-center">
              <SocialIcon
                platform={socialLink.type}
                className="size-6 flex-none opacity-60"
                weight="thin"
              />
              <p className="line-clamp-1 flex-1">{socialLink.url}</p>
            </div>
            <div className="flex items-center scale-0 group-hover/card:scale-100 transition-all ease-in-out">
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
                <CommonIcon label="edit" weight="thin" className="size-6" />
                <Label text="Edit" />
              </button>
              <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-danger dark:hover:bg-background-dark-danger transition-all ease-in-out">
                <CommonIcon label="trash" weight="thin" className="size-6" />
                <Label text="Delete" />
              </button>
            </div>
          </div>
        ))}
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
