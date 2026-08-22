import type { ContactEntry, Gender, User } from "./index.ts";

export type AuthMode = "login" | "signup";

export interface AuthNUser extends User {
  // Verification
  email?: string;
  phoneNumber?: string;
  password?: string;

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
