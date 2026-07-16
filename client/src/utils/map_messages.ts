import type { Message, MessagesTimeline } from "../types";
import { formatDate } from "./format";

const isSameDay = (a: Date, b: Date): boolean => {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
};

const messagesTimelining = (messages: Message[]): MessagesTimeline => {
  const messagesTimeline: MessagesTimeline = {},
    today = new Date(),
    yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  for (const message of messages) {
    const date = new Date(message.createdAt);
    let dateKey = formatDate(date);

    if (isSameDay(date, today)) dateKey = "Today";
    else if (isSameDay(date, yesterday)) dateKey = "Yesterday";

    if (!messagesTimeline[dateKey]) messagesTimeline[dateKey] = [];

    messagesTimeline[dateKey].push(message);
  }
  return messagesTimeline;
};

export default messagesTimelining;
