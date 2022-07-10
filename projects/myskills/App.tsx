//React
import React from "react";
import { StatusBar } from "react-native";

//Screens
import Home from "./src/screens/Home";
import colors from "./src/global/colors";

export default function App() {
  return (
    <>
      <StatusBar backgroundColor={colors.darkGray} barStyle="light-content" />
      <Home />
    </>
  );
}
