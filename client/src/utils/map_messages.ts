import type { Message, MessagesTimeline } from "../types";
import { formatDateShort } from "./format";

const messagesTimelining = (messages: Message[]): MessagesTimeline => {
  const messagesTimeline: MessagesTimeline = {};

  for (const message of messages) {
    const date = new Date(message.createdAt);
    const dateKey = formatDateShort(date);

    if (!messagesTimeline[dateKey]) messagesTimeline[dateKey] = [];

    messagesTimeline[dateKey].push(message);
  }
  return messagesTimeline;
};

export default messagesTimelining;
