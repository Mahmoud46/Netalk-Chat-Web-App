import type {
  ContactEntry,
  CustomName,
  Message,
  PasswordStrength,
  User,
} from "../types";

export const isRouteActive = (pathname: string, path: string): boolean =>
  pathname === path || location.pathname.startsWith(path + "/");

export const mapContactsToUserIds = (
  contacts: ContactEntry[],
): Record<string, CustomName> => {
  return Object.fromEntries(contacts.map((c) => [c.userId, c.customName]));
};

export function showProfileImage(
  messages: Message[],
  index: number,
  maxMinutes = 5,
): boolean {
  const currentMessage = messages[index],
    nextMessage = messages[index + 1];

  // Last message
  if (!nextMessage) {
    return true;
  }

  // Different sender
  if (currentMessage.sender !== nextMessage.sender) {
    return true;
  }

  const currentTime = new Date(currentMessage.createdAt).getTime();

  const nextTime = new Date(nextMessage.createdAt).getTime();

  const diffInMinutes = Math.abs(nextTime - currentTime) / 1000 / 60;

  // Large time gap
  return diffInMinutes > maxMinutes;
}

export const capitalize = (word: string): string => {
  if (!word) return "";

  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const uppercaseAlphabets = (): string[] => {
  return Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
};

export const groupContactEntriesByFirstLetter = (
  contactEntries: User[],
  contacts: Record<string, CustomName>,
): Record<string, User[]> => {
  const contactEntriesByFirstLetter: Record<string, User[]> = {};
  for (const contactEntry of contactEntries) {
    const firstLetter = (
      contacts[contactEntry._id].firstName ??
      contacts[contactEntry._id].lastName
    )
      .trim()
      .charAt(0)
      .toUpperCase();

    if (!contactEntriesByFirstLetter[firstLetter])
      contactEntriesByFirstLetter[firstLetter] = [];

    contactEntriesByFirstLetter[firstLetter].push(contactEntry);
  }
  return Object.keys(contactEntriesByFirstLetter)
    .sort()
    .reduce<Record<string, User[]>>((accumulator, key) => {
      accumulator[key] = contactEntriesByFirstLetter[key];
      return accumulator;
    }, {});
};

export const calculateAge = (birthdate: string) => {
  if (!birthdate) return 0;

  const today = new Date();
  const birthDate = new Date(birthdate);

  // Fast integer math: (Current Year * 10000 + Current Month * 100 + Current Day)
  const todaySum =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();
  const birthSum =
    birthDate.getFullYear() * 10000 +
    (birthDate.getMonth() + 1) * 100 +
    birthDate.getDate();

  // Subtracting the two gives you a large number where the last 4 digits represent
  // whether the birthday has passed. Floor-dividing by 10000 strips them away.
  return Math.floor((todaySum - birthSum) / 10000);
};

export async function copyToClipboard(text: string): Promise<boolean> {
  // Check if the modern Clipboard API is available in the current environment
  if (!navigator?.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error("Failed to copy using Clipboard API:", error);
    // Fall back to document.execCommand if writeText fails (e.g., permissions issue)
    return false;
  }
}

export const checkPasswordStrength = (password: string): PasswordStrength => {
  let score = 0;

  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return "very_weak";
  if (score === 2) return "weak";
  if (score === 3) return "fair";
  if (score === 4) return "moderate";
  if (score === 5) return "good";
  return "strong";
};
