import { useTheme } from "../../hooks";
import { BrandIcon } from "../icons/BrandIcon";
import CommonIcon from "../icons/CommonIcon";

const ContactsEmptyStateScreen = () => {
  const { theme } = useTheme();
  return (
    <div className="flex-1 flex items-center justify-center flex-col gap-8 max-md:py-20">
      <BrandIcon theme={theme} className="size-20 md:size-35" />
      <div className="flex flex-col gap-2 items-center justify-center">
        <h2 className="text-foreground-light-primary text-2xl font-semibold">
          Let’s fill this space!
        </h2>
        <p className="text-foreground-light-secondary dark:text-foreground-dark-secondary max-md:text-sm max-w-120 text-center">
          Your contacts will show up here once you add someone. Find a friend,
          add a contact, and start chatting!
        </p>
      </div>
      <button
        type="button"
        className="w-fit gap-4 flex gradient p-2.5 px-4 rounded-3xl text-white cursor-pointer transition-all ease-in-out hover:scale-105 font-semibold"
      >
        <CommonIcon
          label="plus"
          weight="bold"
          soild={true}
          className="size-6"
        />
        <p>Add Contact</p>
      </button>
    </div>
  );
};

export default ContactsEmptyStateScreen;
