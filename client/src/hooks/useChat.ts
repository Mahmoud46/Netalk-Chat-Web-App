import { useContext } from "react";
import type { ChatContextValue } from "../types";
import { ChatContext } from "../providers/ChatContext";

export const useChat = () => {
  const context = useContext(ChatContext) as ChatContextValue;
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
