//React
import React from "react";
import { Platform } from "react-native";

//React Navigation
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//styled-components
import { useTheme } from "styled-components";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//Screens
import Dashboard from "../screens/Dashboard";
import Register from "../screens/Register";
import Resume from "../screens/Resume";

//Icons
import { Feather } from "@expo/vector-icons";

const { Navigator, Screen } = createBottomTabNavigator();

export default function AppRoutes() {
  const theme = useTheme();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,

        labelPosition: "beside-icon",

        style: {
          height: RFValue(55),
          paddingVertical: Platform.OS === "ios" ? 20 : 0,

          borderTopWidth: 1,
          borderTopColor: theme.colors.secondary,
        },

        labelStyle: {
          fontFamily: theme.fonts.medium,
          fontSize: RFValue(14),
        },
      }}
    >
      <Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          title: "Listagem",
          tabBarIcon: ({ color, size }) => (
            <Feather name="list" color={color} size={size} />
          ),
        }}
      />
      <Screen
        name="Register"
        component={Register}
        options={{
          title: "Cadastrar",
          tabBarIcon: ({ color, size }) => (
            <Feather name="dollar-sign" color={color} size={size} />
          ),
        }}
      />

      <Screen
        name="Resume"
        component={Resume}
        options={{
          title: "Resumo",
          tabBarIcon: ({ color, size }) => (
            <Feather name="pie-chart" color={color} size={size} />
          ),
        }}
      />
    </Navigator>
  );
}
