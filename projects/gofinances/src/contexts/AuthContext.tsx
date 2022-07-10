//React
import React, { createContext, useState, useEffect, ReactNode } from "react";

//AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

//AuthSession
import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

//Services
const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;
const { RESPONSE_TYPE } = process.env;
const { SCOPE } = process.env;

//Storages
import { COLLECTION_USER } from "../storages/storage";

//Types
interface AuthContextProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string | undefined;
}

interface IAuthContextData {
  user: User;
  userStorageLoading: boolean;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

export default function AuthProvider({ children }: AuthContextProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState<boolean>(true);

  async function loadUser() {
    const userStoraged = await AsyncStorage.getItem(COLLECTION_USER);

    if (userStoraged) {
      const userLogged = JSON.parse(userStoraged) as User;
      setUser(userLogged);
    }

    setUserStorageLoading(false);
  }

  async function signInWithGoogle() {
    try {
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${encodeURI(
        String(SCOPE)
      )}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const response = await fetch(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = await response.json();

        const userLogged = {
          id: userInfo.id,
          name: userInfo.given_name,
          email: userInfo.email,
          photo: userInfo.picture,
        };

        setUser(userLogged);

        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const name = credential.fullName!.givenName!;
        const photo = `https://ui-avatars.com/api/?name=${name}&length=1`;

        const userLogged = {
          id: String(credential.user),
          name,
          email: credential.email!,
          photo,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);

    await AsyncStorage.removeItem(COLLECTION_USER);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userStorageLoading,
        signInWithGoogle,
        signInWithApple,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
