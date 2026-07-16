import type { User, ContactEntry, Gender } from ".";
export type AuthMode = "login" | "signup";

export interface AuthContextValue {
  isAuthenticated: boolean;
  authNUser: AuthNUser | null;
  setAuthNUser: (authNUser: AuthNUser | null) => void;
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
