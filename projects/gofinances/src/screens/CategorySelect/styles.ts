//styled-components
import styled from "styled-components/native";

//react-native-gesture-handler
import { GestureHandlerRootView } from "react-native-gesture-handler";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//Icons
import { Feather } from "@expo/vector-icons";

//Types
interface CategoryProps {
  isActive: boolean;
}

export const Container = styled(GestureHandlerRootView)`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding: ${RFValue(15)}px;

  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.secondary_light : theme.colors.background};
`;

export const Icon = styled(Feather)`
  font-size: ${RFValue(20)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Label = styled.Text`
  margin-left: 16px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;

  padding: 24px;
`;
