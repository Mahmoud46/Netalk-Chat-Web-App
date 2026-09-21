import { useState, type ReactNode } from "react";
import type {
  AuthContextValue,
  AuthNUser,
  Gender,
  SignupCredentials,
} from "../types";
import { AuthContext } from "./AuthContext";
import auth_user from "../assets/data/auth_user.json";
import { useNavigate } from "react-router-dom";
import { getDateSixteenYearsAgo } from "../utils/format";
export function AuthProvider({ children }: { children: ReactNode }): ReactNode {
  // Credentials
  const [emailAddress, setEmailAddress] = useState<string>(""),
    [phoneNumber, setPhoneNumber] = useState<string>(""),
    [password, setPassword] = useState<string>(""),
    [verifyWithPhoneNumber, setVerifyWithPhoneNumber] =
      useState<boolean>(false),
    [acceptTerms, setAcceptTerms] = useState<boolean>(true),
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

  // Verifying to continue onboarding
  const startOnboarding = async (): Promise<boolean> => {
    const signupCredentials: {
      email?: string;
      phoneNumber?: string;
      password: string;
    } = { password: password };

    if (verifyWithPhoneNumber) signupCredentials.phoneNumber = phoneNumber;
    else signupCredentials.email = emailAddress;
    // Check for backend {...}
    console.log(signupCredentials);
    return true;
  };

  const signup = async (): Promise<boolean> => {
    const authNCredentials: SignupCredentials = {
      password: password,
      firstName: firstName,
      lastName: lastName,
      birthdate: birthdate,
      gender: gender,
      address: address,
      title: title,
      bio: bio,
    };

    if (verifyWithPhoneNumber) authNCredentials.phoneNumber = phoneNumber;
    else authNCredentials.email = emailAddress;
    if (profileImage) authNCredentials.profileImage = profileImage;
    if (coverImage) authNCredentials.profileCover = coverImage;

    console.log(authNCredentials);

    // Check for backend {...}
    setAuthNUser(auth_user as AuthNUser);
    return true;
  };

  const CompleteOnboarding = async () => {
    setIsAuthenticated(true);
    reset();
    navigate("/");
  };

  const logout = async () => {
    setAuthNUser(null);
    setIsAuthenticated(false);
    navigate("/");
  };

  const reset = async () => {
    setEmailAddress("");
    setPhoneNumber("");
    setPassword("");
    setVerifyWithPhoneNumber(false);
    setAcceptTerms(true);
    setFirstName("");
    setLastName("");
    setBirthdate("");
    setGender("male");
    setAddress("");
    setTitle("");
    setBio("");
    setCoverImage("");
    setProfileImage("");
    setPreviewCoverImage(null);
    setPreviewProfileImage(null);
  };

  const authContextValue: AuthContextValue = {
    credentials: {
      emailAddress,
      setEmailAddress,
      phoneNumber,
      setPhoneNumber,
      password,
      setPassword,
      acceptTerms,
      setAcceptTerms,
      verifyWithPhoneNumber,
      setVerifyWithPhoneNumber,
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
    startOnboarding,
    signup,
    CompleteOnboarding,
    reset,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
