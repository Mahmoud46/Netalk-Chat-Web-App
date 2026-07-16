import type { ReactNode } from "react";
import type { SocialPlatform } from "../../../types";

import facebook_icon from "../../../assets/icons/facebook.png";
import twitch_icon from "../../../assets/icons/twitch.png";
import linkedin_icon from "../../../assets/icons/linkedin.png";
import behance_icon from "../../../assets/icons/behance.png";
import github_icon from "../../../assets/icons/github.png";
import youtube_icon from "../../../assets/icons/youtube.png";
import instagram_icon from "../../../assets/icons/instagram.png";
import medium_icon from "../../../assets/icons/medium.png";
import x_icon from "../../../assets/icons/twitter-x.png";
import globe_icon from "../../../assets/icons/globe.png";

const SocialIcon = ({
  platform = "",
  className = "",
}: {
  platform?: SocialPlatform | "website" | string;
  className?: string;
}): ReactNode => {
  switch (platform) {
    case "twitch":
      return (
        <img
          src={twitch_icon}
          alt="twitch"
          loading="lazy"
          className={className}
        />
      );
    case "facebook":
      return (
        <img
          src={facebook_icon}
          alt="facebook"
          loading="lazy"
          className={className}
        />
      );
    case "linkedin":
      return (
        <img
          src={linkedin_icon}
          alt="linkedin"
          loading="lazy"
          className={className}
        />
      );
    case "behance":
      return (
        <img
          src={behance_icon}
          alt="behance"
          loading="lazy"
          className={className}
        />
      );
    case "x":
      return <img src={x_icon} alt="x" loading="lazy" className={className} />;
    case "github":
      return (
        <img
          src={github_icon}
          alt="github"
          loading="lazy"
          className={className}
        />
      );
    case "youtube":
      return (
        <img
          src={youtube_icon}
          alt="youtube"
          loading="lazy"
          className={className}
        />
      );
    case "instagram":
      return (
        <img
          src={instagram_icon}
          alt="instagram"
          loading="lazy"
          className={className}
        />
      );
    case "medium":
      return (
        <img
          src={medium_icon}
          alt="medium"
          loading="lazy"
          className={className}
        />
      );

    default:
      return (
        <img
          src={globe_icon}
          alt="default"
          loading="lazy"
          className={className}
        />
      );
  }
};

export default SocialIcon;
