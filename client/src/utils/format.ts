export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

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
