import usa_flag from "../../assets/icons/flags/usa.png";
import saudi_arabia_flag from "../../assets/icons/flags/saudi_arabia.png";
import type { LanguageCode } from "../../types";

export const FlagIcon = ({
  langaugeCode,
  className = "",
}: {
  langaugeCode: LanguageCode;
  className?: string;
}) => {
  switch (langaugeCode) {
    case "ar":
      return (
        <img
          src={saudi_arabia_flag}
          alt="ar"
          className={className}
          loading="lazy"
        />
      );
    case "en":
      return (
        <img src={usa_flag} alt="ar" className={className} loading="lazy" />
      );

    default:
      return (
        <img src={usa_flag} alt="en" className={className} loading="lazy" />
      );
  }
};
