import { lazy, useState } from "react";
import { SettingsHeader } from "../../components/common/Header";
import { ToggleButton } from "../AppearanceSettings";
import { LANGUAGES_CODE_MAP } from "../../config/languages";
import Label from "../../components/common/Label";
import CommonIcon from "../../components/icons/CommonIcon";
import { SettingsSidebarIcon } from "../../components/icons/SidebarIcon";
import { useTheme } from "../../hooks";

const LanguageDropList = lazy(() =>
  import("../../components/common/DropList").then((module) => ({
    default: module.LanguageDropList,
  })),
);

const ShowTranslateButton = () => {
  const { toggleShowTranslateButton, isMessageTranslateButtonShown } =
    useTheme();

  return (
    <div className="flex relative font-semibold items-center justify-between pl-4 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <label htmlFor="show-translate-button" className="cursor-pointer flex-1">
        Show Translate Button{" "}
        <span className="opacity-50 text-xs">
          ({isMessageTranslateButtonShown ? "Active" : "Inactive"})
        </span>
      </label>
      <input
        type="checkbox"
        name="show-translate-button"
        id="show-translate-button"
        className="absolute right-0 opacity-0 cursor-pointer"
        onChange={toggleShowTranslateButton}
        checked={isMessageTranslateButtonShown}
      />
      <ToggleButton
        isActive={isMessageTranslateButtonShown}
        action={toggleShowTranslateButton}
      />
    </div>
  );
};

const TranslateMessageOptions = () => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
        <CommonIcon label="translate" className="size-6.5" weight="thin" />
        <p>Translate Messages</p>
      </div>
      <ShowTranslateButton />
    </div>
  );
};

const LanguageOptions = () => {
  const { langCode, changeLangCode } = useTheme(),
    [isActive, setIsActive] = useState<boolean>(false);

  const toggleLanguageList = () => setIsActive(true);

  return (
    <div className="flex flex-col gap-1 w-full text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <div className="flex justify-between items-center relative">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <SettingsSidebarIcon
            label="language"
            className="size-6.5"
            weight="thin"
          />
          <p>Language</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex flex-col justify-start">
            <p className="text-sm">{LANGUAGES_CODE_MAP[langCode].nativeName}</p>
            {langCode != "en" && (
              <p className="text-xs">
                {LANGUAGES_CODE_MAP[langCode].englishName}
              </p>
            )}
          </div>

          {isActive && (
            <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out z-30">
              <CommonIcon
                label="chevron_right"
                weight="thin"
                className={`size-7 transition-all ease-in-out ${isActive ? "-rotate-90" : "rotate-90"}`}
              />
              <Label text="Close" />
            </button>
          )}
          {!isActive && (
            <button
              onClick={toggleLanguageList}
              className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out z-30"
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
        <LanguageDropList
          isActive={isActive}
          langCode={langCode}
          changeLangCode={changeLangCode}
          setIsActive={setIsActive}
        />
      </div>
      <p className="text-xs">
        Choose the language that feels most comfortable for you. Changing this
        setting will update menus, buttons, settings, and notifications, while
        your messages and conversations will stay in their original languages.
      </p>
    </div>
  );
};

export default function LanguageSettings() {
  return (
    <>
      <SettingsHeader title="Language Settings" />
      <div className="flex flex-wrap w-full gap-6 max-w-200">
        <div className="flex flex-col flex-1 gap-6 pt-3">
          <TranslateMessageOptions />
        </div>
        <div className="flex flex-col flex-1 gap-6 min-w-80">
          <LanguageOptions />
        </div>
      </div>
    </>
  );
}
