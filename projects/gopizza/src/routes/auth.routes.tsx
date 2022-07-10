import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import { SignIn } from "@screens/SignIn";

//Create Navigator
const { Navigator, Screen } = createNativeStackNavigator();

export const AuthRoutes: React.FC = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SignIn" component={SignIn} />
    </Navigator>
  );
};
