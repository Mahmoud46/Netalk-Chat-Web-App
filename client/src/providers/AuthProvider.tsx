import { useState, type ReactNode } from "react";
import type { AuthContextValue, AuthNUser, Gender } from "../types";
import { AuthContext } from "./AuthContext";
import auth_user from "../assets/data/auth_user.json";
import { useNavigate } from "react-router-dom";
import { getDateSixteenYearsAgo } from "../utils/format";
export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  // Credentials
  const [emailPhone, setEmailPhone] = useState<string>(""),
    [password, setPassword] = useState<string>(""),
    [acceptTerms, setAcceptTerms] = useState<boolean>(false),
    // Signup Personal Details
    [firstName, setFirstName] = useState<string>(""),
    [lastName, setLastName] = useState<string>(""),
    [birthdate, setBirthdate] = useState<string>(getDateSixteenYearsAgo()),
    [gender, setGender] = useState<Gender>("male"),
    [address, setAddress] = useState<string>(""),
    [title, setTitle] = useState<string>("New Voice"),
    [bio, setBio] = useState<string>(
      "Just joined Netalk! Excited to connect and join the conversation.",
    ),
    // Signup Media Assets
    [coverImage, setCoverImage] = useState<string>(""),
    [profileImage, setProfileImage] = useState<string>(""),
    [previewCoverImage, setPreviewCoverImage] = useState<File | null>(null),
    [previewProfileImage, setPreviewProfileImage] = useState<File | null>(null);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true),
    [authNUser, setAuthNUser] = useState<AuthNUser | null>(
      auth_user as AuthNUser,
    );

  const navigate = useNavigate();

  const logout = async () => {
    setAuthNUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const authContextValue: AuthContextValue = {
    credentials: {
      emailPhone,
      setEmailPhone,
      password,
      setPassword,
      acceptTerms,
      setAcceptTerms,
    },
    personalDetails: {
      firstName,
      setFirstName,
      lastName,
      setLastName,
      birthdate,
      setBirthdate,
      gender,
      setGender,
      address,
      setAddress,
      title,
      setTitle,
      bio,
      setBio,
    },
    mediaAssets: {
      coverImage,
      setCoverImage,
      profileImage,
      setProfileImage,
      previewCoverImage,
      setPreviewCoverImage,
      previewProfileImage,
      setPreviewProfileImage,
    },
    isAuthenticated,
    authNUser,
    setAuthNUser,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
