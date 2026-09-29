import type { IconWeight, SocialPlatform, ThemeMode } from "../../types";

import google_icon from "../../assets/icons/social/google.png";
import microsoft_icon from "../../assets/icons/social/microsoft.png";
import facebook_icon from "../../assets/icons/social/facebook.png";
import instagram_icon from "../../assets/icons/social/instagram.png";
import medium_icon from "../../assets/icons/social/medium.png";
import youtube_icon from "../../assets/icons/social/youtube.png";
import linkedin_icon from "../../assets/icons/social/linkedin.png";
import behance_icon from "../../assets/icons/social/behance.png";
import github_icon from "../../assets/icons/social/github.png";
import twitch_icon from "../../assets/icons/social/twitch.png";
import twitter_x_icon from "../../assets/icons/social/twitter_x.png";
import dribbble_icon from "../../assets/icons/social/dribbble.png";
import discord_icon from "../../assets/icons/social/discord.png";
import globe_icon from "../../assets/icons/social/globe.png";
import reddit_icon from "../../assets/icons/social/reddit.png";

import globe_thin_icon from "../../assets/icons/social/globe_thin.png";

import gmail_icon from "../../assets/icons/social/gmail.png";
import outlook_icon from "../../assets/icons/social/outlook.png";
import yahoo_mail_icon from "../../assets/icons/social/yahoo_mail.png";
import CommonIcon from "./CommonIcon";

export const EmailIcon = ({
  email,
  className = "",
}: {
  email: string;
  className?: string;
}) => {
  const emailType = email.match(/@([a-zA-Z0-9-]+)\./)?.[1];
  switch (emailType) {
    case "gmail":
      return (
        <img
          src={gmail_icon}
          loading="lazy"
          className={className}
          alt="gmail"
        />
      );
    case "outlook":
      return (
        <img
          src={outlook_icon}
          loading="lazy"
          className={className}
          alt="outlook"
        />
      );
    case "yahoo":
      return (
        <img
          src={yahoo_mail_icon}
          loading="lazy"
          className={className}
          alt="yahoo_mail"
        />
      );

    default:
      return <CommonIcon label="envelope_alt" className={className} />;
  }
};

export default function SocialIcon({
  platform = "website",
  className = "",
  weight = "base",
  theme = "light",
}: {
  platform?: SocialPlatform | "website" | string;
  className?: string;
  weight?: IconWeight;
  theme?: ThemeMode;
}) {
  switch (platform) {
    case "facebook":
      return <img src={facebook_icon} loading="lazy" className={className} />;
    case "instagram":
      return <img src={instagram_icon} loading="lazy" className={className} />;
    case "youtube":
      return <img src={youtube_icon} loading="lazy" className={className} />;
    case "medium":
      return <img src={medium_icon} loading="lazy" className={className} />;
    case "linkedin":
      return <img src={linkedin_icon} loading="lazy" className={className} />;
    case "behance":
      return <img src={behance_icon} loading="lazy" className={className} />;
    case "reddit":
      return <img src={reddit_icon} loading="lazy" className={className} />;
    case "github":
      return (
        <img
          src={github_icon}
          loading="lazy"
          className={`${theme == "light" && "invert-100"} ${className}`}
        />
      );
    case "twitch":
      return <img src={twitch_icon} loading="lazy" className={className} />;
    case "x":
      return <img src={twitter_x_icon} loading="lazy" className={className} />;
    case "google":
      return <img src={google_icon} loading="lazy" className={className} />;
    case "microsoft":
      return <img src={microsoft_icon} loading="lazy" className={className} />;
    case "dribbble":
      return <img src={dribbble_icon} loading="lazy" className={className} />;
    case "discord":
      return <img src={discord_icon} loading="lazy" className={className} />;

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
