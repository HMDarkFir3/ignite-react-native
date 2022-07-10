import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { translationFirebaseErrorsPTBR } from "react-translation-firebase-errors";

//DTOS
import { UserDTO } from "@dtos/UserDTO";

//Storages
import { COLLECTION_USER } from "@storages/index";

//Interfaces
type AuthContextData = {
  user: UserDTO | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  forgotPassword: (email: string) => any;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function loadUser() {
    setIsLoading(true);

    const storedUser = await AsyncStorage.getItem(COLLECTION_USER);

    if (storedUser) {
      const userData = JSON.parse(storedUser) as UserDTO;

      setUser(userData);
    }

    setIsLoading(false);
  }

  async function signIn(email: string, password: string) {
    setIsLoading(true);

    await auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (account) => {
        await firestore()
          .collection("users")
          .doc(account.user.uid)
          .get()
          .then(async (profile) => {
            if (profile.exists) {
              const { name, is_admin } = profile.data() as UserDTO;

              const userData = {
                id: account.user.uid,
                name,
                email: account.user.email,
                is_admin,
              };

              await AsyncStorage.setItem(
                COLLECTION_USER,
                JSON.stringify(userData)
              );

              setUser(userData);
            }
          })
          .catch((err) => {
            const error = translationFirebaseErrorsPTBR(err.code);
            Alert.alert(error);
          });
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  async function signOut() {
    await auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.removeItem(COLLECTION_USER);

        setUser(null);
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  async function forgotPassword(email: string) {
    setIsLoading(true);

    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        return true;
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, signIn, signOut, forgotPassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};
