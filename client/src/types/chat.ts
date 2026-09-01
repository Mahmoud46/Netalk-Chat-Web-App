import type { User } from ".";

export interface ChatContextValue {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  getUser: (userId: string) => Promise<User | undefined>;
  currentChat: Chat | null;
  setCurrentChat: (currentChat: Chat | null) => void;
  currentParticipant: User | null;
  setCurrentParticipant: (currentParticipant: User | null) => void;
  getMessages: (chatId: string) => Promise<Message[]>;
  contacts: Record<string, string>;
  setContacts: (contacts: Record<string, string>) => void;
  currentContactEntry: User | null;
  setCurrentContactEntry: (currentContactEntry: User | null) => void;
  getChatByParticipantId: (participantId: string) => Promise<Chat | undefined>;
  getUserByUsername: (username: string) => Promise<User | undefined>;
}

export interface Chat {
  _id: string;
  participants: string[];
  lastMessage: Message;
  unreadMessages: number;
  sharedMedia?: Attachment[];
  sharedFiles?: Attachment[];
}

export interface Message {
  _id: string;
  chatId: string;

  sender: string;
  text?: string;

  attachment?: Attachment;
  emoji?: EmojiType;

  replyTo?: string;

  status: MessageStatus;
  createdAt: string;
}

export interface Attachment {
  fileId: string;
  url: string;
  type: FileType;
  name: string;
  size: string;
}

export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";
export type FileType = "image" | "audio" | "file" | "video";

export type MessagesTimeline = Record<string, Message[]>;
export type EmojiType =
  | "angry"
  | "cool"
  | "dizzy"
  | "meh"
  | "sad"
  | "wink_smile";
