import React from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { ButtonIcon } from "../ButtonIcon";

import { useAuth } from "../../hooks/useAuth";

import { Container, Title } from "./styles";

type Props = {
  title: string;
  showLogoutButton?: boolean;
};

export function Header({ title, showLogoutButton = false }: Props) {
  const { signOut } = useAuth();

  async function handleSignOut() {
    Alert.alert("Atenção!", "Deseja sair do aplicativo?", [
      {
        text: "Não",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: () => signOut(),
      },
    ]);
  }

  return (
    <Container showLogoutButton={showLogoutButton}>
      <Title>{title}</Title>

      {showLogoutButton && (
        <ButtonIcon
          icon="logout"
          color="alert"
          style={{ marginTop: 20 }}
          onPress={handleSignOut}
        />
      )}
    </Container>
  );
}
