import { useState } from "react";
import { SettingsHeader } from "../../components/common/Header";
import { ArrowIcon } from "../../components/ui/Icons";
import { ToggleButton } from "../AppearanceSettings";
import { SettingsSidebarIcon } from "../../components/ui/icons/SidebarIcon";
import { LANGUAGES, LANGUAGES_CODE_MAP } from "../../config/languages";
import type { LanguageCode } from "../../types";
import Label from "../../components/common/Label";
import CommonIcon from "../../components/icons/common/CommonIcon";

const ShowTranslateButton = () => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const toggleShowTranslateButton = () => setIsActive((prev) => !prev);

  return (
    <div className="flex font-semibold items-center justify-between pl-3 text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <p>
        Show Translate Button{" "}
        <span className="opacity-50 text-xs">
          ({isActive ? "Active" : "Inactive"})
        </span>
      </p>
      <ToggleButton isActive={isActive} action={toggleShowTranslateButton} />
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
  const [languageCode, setLanguageCode] = useState<LanguageCode>("en"),
    [isActive, setIsActive] = useState<boolean>(false);

  const selectLanguage = (languageCode: LanguageCode) =>
    setLanguageCode(languageCode);

  const toggleLanguageList = () => setIsActive((prev) => !prev);

  return (
    <div className="flex flex-col gap-3 w-full text-foreground-light-secondary dark:text-foreground-dark-secondary">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground-light-secondary dark:text-foreground-dark-secondary">
          <SettingsSidebarIcon label="language" className="size-6.5" />
          <p>Language</p>
        </div>

        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={toggleLanguageList}
        >
          <div className="flex flex-col justify-start">
            <p className="text-base">
              {LANGUAGES_CODE_MAP[languageCode].nativeName}
            </p>
            {languageCode != "en" && (
              <p className="text-xs">
                {LANGUAGES_CODE_MAP[languageCode].englishName}
              </p>
            )}
          </div>

          <button className="relative group cursor-pointer p-2 rounded-full hover:bg-background-light-secondary dark:hover:bg-background-dark-secondary transition-all ease-in-out">
            <ArrowIcon
              className={`size-7 transition-all ease-in-out ${isActive ? "-rotate-90" : "rotate-90"}`}
            />
            <Label text={isActive ? "Close" : "Open"} />
          </button>
        </div>
      </div>

      {isActive && (
        <ul className="flex flex-col">
          {LANGUAGES.map((language) => (
            <li
              key={language.code}
              className="cursor-pointer flex justify-between items-center px-3 py-1 transition-all ease-in-out hover:bg-background-light-secondary hover:dark:bg-background-dark-secondary rounded-3xl hover:py-3"
              onClick={() => selectLanguage(language.code as LanguageCode)}
            >
              <div className="flex flex-col">
                <p className="text-base">{language.nativeName}</p>
                <p className="text-xs">{language.englishName}</p>
              </div>
              <div className="aspect-square h-6 rounded-full bg-background-light-surface-2 dark:bg-background-dark-surface-2 flex items-center justify-center">
                <div
                  className={`transition-all ease-in-out aspect-square h-5 scale-0 bg-background-light-primary rounded-full ${languageCode == language.code && "scale-100"}`}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function LanguageSettings() {
  return (
    <>
      <SettingsHeader title="Account Settings" />
      <div className="flex flex-wrap w-full px-3 gap-6">
        <div className="flex flex-col flex-1 gap-6">
          <TranslateMessageOptions />
          <LanguageOptions />
        </div>
        <div className="flex flex-col flex-1"></div>
      </div>
    </>
  );
}
