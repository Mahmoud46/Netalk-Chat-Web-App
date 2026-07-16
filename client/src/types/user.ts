export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: Gender;

  address?: string;
  title?: string;
  bio?: string;

  // More
  profileImage?: string;
  profileCover?: string;

  contactInfo: Contact;

  isActive: boolean;
  lastSeen: string;
}

export interface Contact {
  emails: string[];
  socialLinks: SocialLink[];
  phoneNumbers: string[];
}

export interface ContactEntry {
  userId: string;
  customName: string;
}

export interface SocialLink {
  type: SocialPlatform | "website" | string;
  url: string;
}

export type Gender = "male" | "female" | "others";

export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "tiktok"
  | "youtube"
  | "github"
  | "discord"
  | "reddit"
  | "pinterest"
  | "snapchat"
  | "telegram"
  | "twitch"
  | "medium"
  | "behance"
  | "dribbble";
