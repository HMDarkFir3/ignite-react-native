import React, { createContext, ReactNode, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { translationFirebaseErrorsPTBR } from "react-translation-firebase-errors";

interface User {
  uid: string;
  email: string | null;
}

interface AuthContextData {
  user: User;
  signInAnonymous: () => void;
  signIn: (email: string, password: string) => void;
  signUp: (email: string, password: string) => void;
  forgotPassword: (email: string) => void;
  signOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);

  async function signInAnonymous() {
    const { user } = await auth().signInAnonymously();

    console.log(user);
  }

  async function signIn(email: string, password: string) {
    await auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          uid: response.user.uid,
          email: response.user.email,
        });
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  async function signUp(email: string, password: string) {
    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        setUser({
          uid: response.user.uid,
          email: response.user.email,
        });

        Alert.alert("Usuário criado com sucesso!");
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  async function forgotPassword(email: string) {
    await auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Enviamos um link de redefinição de senha para seu e-mail");
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  async function signOut() {
    auth().signOut();
    setUser({} as User);
  }

  return (
    <AuthContext.Provider
      value={{ user, signInAnonymous, signIn, signUp, forgotPassword, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}
