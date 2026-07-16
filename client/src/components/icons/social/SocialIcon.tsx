import type { IconWeight, SocialPlatform } from "../../../types";

import facebook_icon from "./icons/facebook.png";
import instagram_icon from "./icons/instagram.png";
import medium_icon from "./icons/medium.png";
import youtube_icon from "./icons/youtube.png";
import linkedin_icon from "./icons/linkedin.png";
import behance_icon from "./icons/behance.png";
import github_icon from "./icons/github.png";
import twitch_icon from "./icons/twitch.png";
import twitter_x_icon from "./icons/twitter_x.png";
import globe_icon from "./icons/globe.png";

import globe_thin_icon from "./icons/globe_thin.png";

export default function SocialIcon({
  platform = "website",
  className = "",
  weight = "normal",
}: {
  platform?: SocialPlatform | "website" | string;
  className?: string;
  weight?: IconWeight;
}) {
  switch (platform) {
    case "facebook":
      return (
        <img
          src={facebook_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "instagram":
      return (
        <img
          src={instagram_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "youtube":
      return (
        <img
          src={youtube_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "medium":
      return (
        <img
          src={medium_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "linkedin":
      return (
        <img
          src={linkedin_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "behance":
      return (
        <img
          src={behance_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "github":
      return (
        <img
          src={github_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "twitch":
      return (
        <img
          src={twitch_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
    case "x":
      return (
        <img
          src={twitter_x_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );

    default:
      return (
        <img
          src={weight == "thin" ? globe_thin_icon : globe_icon}
          loading="lazy"
          className={`main-icon ${className ?? ""}`}
        />
      );
  }
}
