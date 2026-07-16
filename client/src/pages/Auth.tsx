import type { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import type { AuthMode } from "../types";

// yourapp.com/auth?mode=signup
export default function Auth(): ReactNode {
  const [searchParams] = useSearchParams();
  const authMode: AuthMode = (searchParams.get("mode") ?? "login") as AuthMode;

  return <div>{authMode == "signup" ? "Sign Up" : "Log In"} Page</div>;
}
