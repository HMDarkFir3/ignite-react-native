import React, { useState } from "react";
import { Alert } from "react-native";

import { useAuth } from "../../hooks/useAuth";

import { Container, Account, Title, Subtitle } from "./styles";
import { ButtonText } from "../../components/ButtonText";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

export function SignIn() {
  const { signIn, signUp, forgotPassword } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("Atenção!", "Preencha os campos para entrar no app.");
      return;
    }

    signIn(email, password);
  }

  function handleSignUp() {
    if (email === "" || password === "") {
      Alert.alert("Atenção!", "Preencha os campos para criar a conta.");
      return;
    }

    signUp(email, password);
  }

  function handleForgotPassword() {
    if (email === "") {
      Alert.alert("Digite seu e-mail para redefinir sua senha!");
      return;
    }

    forgotPassword(email);
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        value={email}
      />

      <Input
        placeholder="senha"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      <Button title="Entrar" onPress={handleSignIn} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleSignUp} />
      </Account>
    </Container>
  );
}
