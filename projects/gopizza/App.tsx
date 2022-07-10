import { StatusBar } from "expo-status-bar";
import React from "react";

//Contexts
import { AuthProvider } from "@contexts/AuthContext";

//Routes
import { Routes } from "@routes/index";
import { Order } from "@screens/Order";
import { Orders } from "@screens/Orders";

//Settings themes
import { ThemeProvider } from "styled-components/native";
import { light } from "@themes/index";

//Settings Fonts
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { DMSans_400Regular } from "@expo-google-fonts/dm-sans";
import { DMSerifDisplay_400Regular } from "@expo-google-fonts/dm-serif-display";

export default function App() {
  const [fontsLoaded] = useFonts({
    DMSans_400Regular,
    DMSerifDisplay_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={light}>
      <AuthProvider>
        <StatusBar style="light" translucent={true} />
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
