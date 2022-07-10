//styled-components
import styled, { css } from "styled-components/native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//Icons
import { Feather } from "@expo/vector-icons";

//Types
interface Props {
  type: "up" | "down" | "total";
}

export const Container = styled.View<Props>`
  width: ${RFValue(300)}px;

  margin-right: ${({ type }) => (type === "total" ? 0 : 16)}px;

  padding: 19px 23px ${RFValue(42)}px 23px;

  background-color: ${({ theme, type }) =>
    type === "total" ? theme.colors.secondary : theme.colors.shape};
  border-radius: 5px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Title = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
`;

export const Icon = styled(Feather)<Props>`
  font-size: ${RFValue(40)}px;

  ${({ theme, type }) =>
    type === "up" &&
    css`
      color: ${theme.colors.success};
    `}

  ${({ theme, type }) =>
    type === "down" &&
    css`
      color: ${theme.colors.attention};
    `}

  ${({ theme, type }) =>
    type === "total" &&
    css`
      color: ${theme.colors.shape};
    `}
`;

export const Footer = styled.View``;

export const Amount = styled.Text<Props>`
  margin-top: 38px;

  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
`;

export const LastTransaction = styled.Text<Props>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === "total" ? theme.colors.shape : theme.colors.title};
`;
