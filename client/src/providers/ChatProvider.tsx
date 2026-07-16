import { useEffect, useState, type ReactNode } from "react";
import type { Chat, ChatContextValue, Message, User } from "../types";
import { ChatContext } from "./ChatContext";
import chats_data from "../assets/data/chats.json";
import users from "../assets/data/users.json";
import messages from "../assets/data/messages.json";
import { useAuth } from "../hooks";
import { mapContactsToUserIds } from "../utils/helpers";

export function ChatProvider({ children }: { children: ReactNode }): ReactNode {
  const { authNUser } = useAuth();
  const [chats, setChats] = useState<Chat[]>(chats_data as Chat[]),
    [currentChat, setCurrentChat] = useState<Chat | null>(null),
    [currentParticipant, setCurrentParticipant] = useState<User | null>(null),
    [contacts, setContacts] = useState<Record<string, string>>(
      mapContactsToUserIds(authNUser?.contacts ?? []),
    ),
    [currentContactEntry, setCurrentContactEntry] = useState<User | null>(null);

  const getUser = async (userId: string): Promise<User | undefined> =>
    (users as User[]).find((user) => user._id === userId);

  const getMessages = async (chatId: string): Promise<Message[]> =>
    (messages as Message[]).filter((message) => message.chatId == chatId);

  useEffect(() => {
    // const test = async () => {
    //   const user = await getUser("u011");
    //   if (user) setCurrentParticipant(user);
    // };
    // test();
  }, []);

  const chatContextValue: ChatContextValue = {
    chats,
    setChats,
    getUser,
    currentChat,
    setCurrentChat,
    currentParticipant,
    setCurrentParticipant,
    getMessages,
    contacts,
    setContacts,
    currentContactEntry,
    setCurrentContactEntry,
  };

  return (
    <ChatContext.Provider value={chatContextValue}>
      {children}
    </ChatContext.Provider>
  );
}
