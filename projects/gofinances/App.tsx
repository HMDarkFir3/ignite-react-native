//React
import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from "react";
import { StatusBar } from "react-native";

//styled-components
import { ThemeProvider } from "styled-components/native";

//Hooks
import { useAuth } from "./src/hooks/useAuth";

//Fonts
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

//Contexts
import AuthProvider from "./src/contexts/AuthContext";

//Global
import light from "./src/global/styles/light";

//Routes
import Routes from "./src/routes";

export default function App() {
  const { userStorageLoading } = useAuth();

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={light}>
      <StatusBar backgroundColor="#5636d3" barStyle="light-content" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
