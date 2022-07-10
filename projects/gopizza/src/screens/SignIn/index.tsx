import React, { useState, useEffect, useRef } from "react";
import { TextInput, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useKeyboard } from "@react-native-community/hooks";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Screens
import { ForgotPassword } from "@screens/ForgotPassword";

//Components
import Input from "@components/Input";
import { Button } from "@components/Button";
import { CustomModal } from "@components/CustomModal";

//Styles
import {
  Container,
  Content,
  BrandWrapper,
  Brand,
  Title,
  ForgotPasswordButton,
  ForgotPasswordLabel,
} from "./styles";

//PNG
import BrandPng from "@assets/brand.png";

export const SignIn: React.FC = () => {
  //Hooks
  const { isLoading, signIn } = useAuth();
  const keyboard = useKeyboard();

  //States
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  //Refs
  const inputEmailRef = useRef<TextInput>(null);
  const inputPasswordRef = useRef<TextInput>(null);

  function inputOnBlur() {
    inputEmailRef.current?.blur();
    inputPasswordRef.current?.blur();
  }

  function handleSignIn() {
    if (email === "" || password === "") {
      Alert.alert("Atenção!", "Preencha os campos para realizar o login.");
      return;
    }

    signIn(email, password);
  }

  function handleOpenForgotPassword() {
    setIsOpenModal(!isOpenModal);
  }

  function handleCloseForgotPassword() {
    setIsOpenModal(!isOpenModal);
  }

  useEffect(() => {
    if (!keyboard.keyboardShown) {
      inputOnBlur();
    }
  }, [keyboard.keyboardShown]);

  return (
    <>
      <Container>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <Content>
            <BrandWrapper>
              <Brand source={BrandPng} />
            </BrandWrapper>

            <Title>Login</Title>
            <Input
              ref={inputEmailRef}
              placeholder="E-mail"
              type="secondary"
              autoCorrect={false}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <Input
              ref={inputPasswordRef}
              placeholder="Senha"
              type="secondary"
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />

            <ForgotPasswordButton
              activeOpacity={0.6}
              onPress={handleOpenForgotPassword}
            >
              <ForgotPasswordLabel>Esqueceu a senha?</ForgotPasswordLabel>
            </ForgotPasswordButton>

            <Button
              type="secondary"
              title="Entrar"
              isLoading={isLoading}
              onPress={handleSignIn}
            />
          </Content>
        </KeyboardAvoidingView>
      </Container>

      <CustomModal visible={isOpenModal}>
        <ForgotPassword handleCloseForgotPassword={handleCloseForgotPassword} />
      </CustomModal>
    </>
  );
};
