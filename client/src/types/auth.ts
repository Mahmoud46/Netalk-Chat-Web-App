import type { User, ContactEntry, Gender } from ".";
export type AuthMode = "login" | "signup";
export type PasswordStrength =
  | "very_weak"
  | "weak"
  | "fair"
  | "moderate"
  | "good"
  | "strong";

export interface AuthContextValue {
  credentials: Credentials;
  personalDetails: PersonalDetails;
  mediaAssets: MeidaAssets;
  isAuthenticated: boolean;
  authNUser: AuthNUser | null;
  setAuthNUser: (authNUser: AuthNUser | null) => void;
  startOnboarding: () => Promise<boolean>;
  signup: () => Promise<boolean>;
  CompleteOnboarding: () => Promise<void>;
  reset: () => Promise<void>;
  logout: () => Promise<void>;
}

interface Credentials {
  emailAddress: string;
  setEmailAddress: React.Dispatch<React.SetStateAction<string>>;
  phoneNumber: string;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  acceptTerms: boolean;
  setAcceptTerms: React.Dispatch<React.SetStateAction<boolean>>;

  verifyWithPhoneNumber: boolean;
  setVerifyWithPhoneNumber: React.Dispatch<React.SetStateAction<boolean>>;
}

interface PersonalDetails {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  birthdate: string;
  setBirthdate: React.Dispatch<React.SetStateAction<string>>;
  gender: Gender;
  setGender: React.Dispatch<React.SetStateAction<Gender>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  bio: string;
  setBio: React.Dispatch<React.SetStateAction<string>>;
}

interface MeidaAssets {
  coverImage: string;
  setCoverImage: React.Dispatch<React.SetStateAction<string>>;
  previewCoverImage: File | null;
  setPreviewCoverImage: React.Dispatch<React.SetStateAction<File | null>>;
  profileImage: string;
  setProfileImage: React.Dispatch<React.SetStateAction<string>>;
  previewProfileImage: File | null;
  setPreviewProfileImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export interface AuthNUser extends User {
  // Verification
  email?: string;
  phoneNumber?: string;

  //
  contacts: ContactEntry[];

  mutedUsers: string[];
  archivedChats: string[];
  blockedUsers: string[];
}

export interface AuthNCredentials {
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: Gender;

  bio?: string;

  // Verification
  email?: string;
  phoneNumber?: string;

  password: string;
}

export interface LoginCredentials {
  email?: string;
  phoneNumber?: string;
  password: string;
}

export interface SignupCredentials {
  email?: string;
  phoneNumber?: string;
  password: string;

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
}
