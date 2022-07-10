//react-native-gesture-handler
import { RectButton } from "react-native-gesture-handler";

//styled-components
import styled, { css } from "styled-components/native";

//react-native-responsive-fontsize
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//Icons
import { Feather } from "@expo/vector-icons";

//Types
interface IconProps {
  type: "up" | "down";
}

interface ContainerProps {
  type: "up" | "down";
  isActive: boolean;
}

export const Container = styled.View<ContainerProps>`
  justify-content: center;

  width: ${RFPercentage(24)}px;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  ${({ theme, type, isActive }) =>
    isActive &&
    type === "up" &&
    css`
      background-color: ${theme.colors.success_light};
    `};

  ${({ theme, type, isActive }) =>
    isActive &&
    type === "down" &&
    css`
      background-color: ${theme.colors.attention_light};
    `};
`;

export const Button = styled(RectButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: 16px 35px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${RFValue(24)}px;
  color: ${({ theme, type }) =>
    type === "up" ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  margin-left: 12px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};
`;
