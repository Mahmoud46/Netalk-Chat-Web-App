import type { CustomName, User } from ".";

export interface ChatContextValue {
  chats: Chat[];
  setChats: (chats: Chat[]) => void;
  getUser: (userId: string) => Promise<User | undefined>;
  currentChat: Chat | null;
  setCurrentChat: (currentChat: Chat | null) => void;
  currentParticipant: User | null;
  setCurrentParticipant: (currentParticipant: User | null) => void;
  getMessages: (chatId: string) => Promise<Message[]>;
  contacts: Record<string, CustomName>;
  setContacts: (contacts: Record<string, CustomName>) => void;
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
  duration?: string;
  createdAt: string;
}

export type MessageStatus =
  | "sending"
  | "sent"
  | "delivered"
  | "read"
  | "failed";

export type FileType = "image" | "audio" | "file" | "video";
export type FileFormat =
  | "fig"
  | "psd"
  | "ai"
  | "aep"
  | "sketch"
  | "cdr"
  | "c4d"
  | "blend"
  | ImageFileFormat
  | AudioFileFormat
  | DocumentFileFormat
  | PresentationFileFormat
  | SpreadsheetFileFormat
  | "zip"
  | "rar"
  | "exe"
  | "dmg"
  | "apk"
  | "html"
  | "css"
  | "js"
  | "ts"
  | "java"
  | "json";

type ImageFileFormat =
  | "jpg"
  | "jpeg"
  | "png"
  | "gif"
  | "webp"
  | "tiff"
  | "svg"
  | "ico";

type AudioFileFormat = "mp3" | "mp4" | "wav" | "avi" | "mov" | "mpg";
type DocumentFileFormat =
  | "pdf"
  | "docx"
  | "doc"
  | "txt"
  | "rtf"
  | "odt"
  | "pages";
type PresentationFileFormat =
  | "pptx"
  | "ppt"
  | "ppsx"
  | "pps"
  | "potx"
  | "pot"
  | "odp"
  | "key";
type SpreadsheetFileFormat =
  | "xlsx"
  | "xls"
  | "xlsm"
  | "xltx"
  | "xlt"
  | "ods"
  | "csv";
export type MessagesTimeline = Record<string, Message[]>;
export type EmojiType =
  | "angry"
  | "cool"
  | "dizzy"
  | "meh"
  | "sad"
  | "wink_smile";
