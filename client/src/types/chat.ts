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

  reacts?: { interactor_id: string; emoji: EmojiType }[];

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
  | "winking_face"
  | "ace_with_bags_under_eyes"
  | "beaming_face_with_smiling_eyes"
  | "clapping_hands"
  | "face_with_tears_of_joy"
  | "grinning_face"
  | "grinning_face_with_big_eyes"
  | "grinning_face_with_smiling_eyes"
  | "grinning_face_with_sweat"
  | "grinning_squinting_face"
  | "hand_with_fingers_splayed"
  | "handshake"
  | "heart_hands"
  | "index_pointing_at_the_viewer"
  | "melting_face"
  | "ok_hand"
  | "pinched_fingers"
  | "pinching_hand"
  | "raised_back_of_hand"
  | "rolling_on_the_floor_laughing"
  | "slightly_smiling_face"
  | "smiling_face_with_halo"
  | "smiling_face_with_heart_eyes"
  | "smiling_face_with_hearts"
  | "smiling_face_with_smiling_eyes"
  | "star_struck"
  | "thumbs_down"
  | "thumbs_up"
  | "upside_down_face"
  | "victory_hand"
  | "vulcan_salute"
  | "waving_hand";
