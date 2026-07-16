import type { ReactNode } from "react";
import { AuthProvider } from "./AuthProvider";
import { ThemeProvider } from "./ThemeProvider";
import { ChatProvider } from "./ChatProvider";

export default function AppProvider({
  children,
}: {
  children: ReactNode;
}): ReactNode {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ChatProvider>{children}</ChatProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
