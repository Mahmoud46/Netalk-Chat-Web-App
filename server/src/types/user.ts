export interface IUser {
  _id: string;

  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: Gender;

  password: string;
  address?: string;
  bio?: string;

  // Verification
  email?: string;
  phoneNumber?: string;

  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;

  // More
  profileImage?: string;
  profileCover?: string;

  isActive: boolean;
  lastSeen: string;

  //
  contactInfo: Contact;
  contacts: ContactEntry[];

  mutedUsers: string[];
  archivedChats: string[];
  blockedUsers: string[];
}

type Gender = "male" | "female" | "others";

interface Contact {
  emails: string[];
  socialLinks: SocialLink[];
  phoneNumbers: string[];
}

interface ContactEntry {
  userId: string;
  customName: string;
}

interface SocialLink {
  type: SocialPlatform | "website" | string;
  url: string;
}

type SocialPlatform =
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
