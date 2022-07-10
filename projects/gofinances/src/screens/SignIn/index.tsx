//React
import React, { useState } from "react";
import { Alert, ActivityIndicator, Platform } from "react-native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//styled-components
import { useTheme } from "styled-components";

//Components
import SignInSocialButton from "../../components/SignInSocialButton";

//Hooks
import { useAuth } from "../../hooks/useAuth";

//Styles
import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  SignInWrapper,
} from "./styles";

//Svg
import GoogleSvg from "../../assets/google.svg";
import AppleSvg from "../../assets/apple.svg";
import LogoSvg from "../../assets/logo.svg";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { signInWithGoogle, signInWithApple } = useAuth();

  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro de conexão",
        "Não foi possível conectar a conta Google."
      );
    }
    setIsLoading(false);
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro de conexão",
        "Não foi possível conectar a conta Google."
      );
    }
    setIsLoading(false);
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas{"\n"}
            finanças de forma{"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com{"\n"}
          uma das contas abaixo.
        </SignInTitle>
      </Header>

      <Footer>
        <SignInWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSvg}
            onPress={handleSignInWithGoogle}
          />

          {Platform.OS === "ios" && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSvg}
              onPress={handleSignInWithApple}
            />
          )}
        </SignInWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.primary}
            size={30}
            style={{
              marginTop: Platform.OS === "ios" ? RFValue(20) : RFValue(60),
            }}
          />
        )}
      </Footer>
    </Container>
  );
}
