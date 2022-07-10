import React, { useState } from "react";
import { Alert } from "react-native";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Components
import Input from "@components/Input";
import { Button } from "@components/Button";

//Styles
import {
  Container,
  Title,
  Subtitle,
  Content,
  BackButton,
  ChevronIcon,
} from "./styles";

//Interfaces
type Props = {
  handleCloseForgotPassword: () => void;
};

export const ForgotPassword: React.FC<Props> = (props) => {
  const { handleCloseForgotPassword } = props;

  //Hooks
  const { forgotPassword } = useAuth();

  //States
  const [email, setEmail] = useState<string>("");

  function handleSendEmail() {
    if (email.trim() === "") {
      Alert.alert("Atenção!", "Preencha o campo com seu e-mail.");
      return;
    }

    const response = forgotPassword(email);

    if (response) {
      Alert.alert("Atencao!", "E-mail enviado com sucesso", [
        {
          text: "Ok",
          onPress: () => {
            handleCloseForgotPassword();
            setEmail("");
          },
        },
      ]);
    }
  }

  return (
    <Container>
      <BackButton onPress={handleCloseForgotPassword}>
        <ChevronIcon name="chevron-down" />
      </BackButton>

      <Content>
        <Title>Olá,</Title>

        <Subtitle>Preencha o campo com seu e-mail.</Subtitle>

        <Input
          placeholder="E-mail"
          type="primary"
          autoCorrect={false}
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Button type="secondary" title="Enviar" onPress={handleSendEmail} />
      </Content>
    </Container>
  );
};
