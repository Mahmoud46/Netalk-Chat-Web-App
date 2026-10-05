export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDateShort = (date: Date): string => {
  const now = new Date();
  // Reset times to midnight to compare exact calendar days accurately
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  // Difference in calendar days
  const diffTime = today.getTime() - d.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Check Today & Yesterday
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";

  // Check if within the current week (Sunday to Saturday boundaries)
  const currentDayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayOfWeek); // Sunday

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6); // Saturday

  if (d >= startOfWeek && d <= endOfWeek) {
    return date.toLocaleDateString("en-US", { weekday: "short" });
  }

  const currentYear = now.getFullYear();
  if (currentYear == date.getFullYear())
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      .split(",")[0];
  return formatDotDate(date);
};

export const formatDotDate = (date: Date): string =>
  // 18.09.26
  date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    })
    .replace(/\//g, ".");

export const formatTime12Hours = (timestamp: string | Date): string => {
  const date = new Date(timestamp);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatPhoneNumber = (phone: string): string => {
  // Keep only digits and +
  const cleaned = phone.replace(/[^\d+]/g, "");

  // Remove + temporarily for formatting
  const digits = cleaned.replace(/\D/g, "");

  // Country code (1–3 digits)
  const countryCodeLength = digits.length > 11 ? digits.length - 10 : 0;

  const countryCode =
    countryCodeLength > 0 ? `+${digits.slice(0, countryCodeLength)} ` : "";

  const local = digits.slice(countryCodeLength);

  // Split local number into readable groups
  const parts: string[] = [];

  if (local.length > 7) {
    parts.push(local.slice(0, 3));
    parts.push(local.slice(3, 6));
    parts.push(local.slice(6));
  } else if (local.length > 4) {
    parts.push(local.slice(0, 3));
    parts.push(local.slice(3));
  } else {
    parts.push(local);
  }

  return countryCode + parts.join(" ");
};

/**
 * Gets the date from 16 years ago formatted for an HTML date input (YYYY-MM-DD).
 * @returns A string formatted as "YYYY-MM-DD"
 */
export const getDateSixteenYearsAgo = (): string => {
  const date = new Date();
  date.setFullYear(date.getFullYear() - 16);

  const year = date.getFullYear();
  // padStart ensures months and days always have 2 digits (e.g., "08" instead of "8")
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const capitalizeList = (words: string[]): string[] => {
  const wordsList = [];
  for (const word of words) {
    wordsList.push(word[0].toUpperCase().concat(word.slice(1, word.length)));
    console.log(word);
  }

  return wordsList;
};

export const formatText = (text: string) => {
  switch (text) {
    case "github":
      return "GitHub";
    case "linkedin":
      return "LinkedIn";
    case "gitlab":
      return "GitLab";
    case "youtube":
      return "YouTube";
    default:
      return capitalizeList(text.split(" ")).join(" ");
  }
};

export const maskPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, "");
  const len = cleaned.length;

  // Handle edge cases for short numbers
  if (len < 3) return `+${cleaned}`;

  // Calculate how many characters make up 70% (rounded)
  const maskLength = Math.round(len * 0.7);

  // Calculate remaining characters to split between start and end
  const remaining = len - maskLength;
  const startLength = Math.floor(remaining / 2);
  const endLength = remaining - startLength;

  // Slice the unmasked parts
  const startPart = cleaned.slice(0, startLength);
  const endPart = cleaned.slice(len - endLength);

  // Generate the bullet mask matching the exact length of hidden characters
  const mask = "•".repeat(maskLength);

  // Return formatted international string
  return `+${startPart} ${mask} ${endPart}`;
};

export const maskEmailAddress = (email: string): string => {
  // Split email into username and domain parts
  const parts = email.split("@");
  if (parts.length !== 2) return email; // Return original if not a valid email structure

  const [username, domain] = parts;
  const len = username.length;

  // Handle short usernames gracefully
  if (len <= 2) {
    return `${"•".repeat(len)}@${domain}`;
  }

  // Calculate how many characters make up 80% of the username (rounded up to mask more)
  const maskLength = Math.max(1, Math.round(len * 0.7));

  // Calculate remaining characters to split between start and end
  const remaining = len - maskLength;
  const startLength = Math.floor(remaining / 2);
  const endLength = remaining - startLength;

  // Slice the unmasked parts of the username
  const startPart = username.slice(0, startLength);
  const endPart = username.slice(len - endLength);

  // Generate the bullet mask
  const mask = "•".repeat(maskLength);

  // Reconstruct the email
  return `${startPart}${mask}${endPart}@${domain}`;
};
