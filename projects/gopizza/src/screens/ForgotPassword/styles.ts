import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

//Icons
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;

  padding: 0 32px;

  background-color: white;
`;

export const Content = styled.View`
  width: 100%;
`;

export const Title = styled.Text`
  font-size: ${RFValue(20)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.PRIMARY_800};
  `}
`;

export const Subtitle = styled.Text`
  margin-bottom: 60px;

  font-size: ${RFValue(20)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.PRIMARY_800};
  `}
`;

export const BackButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.6,
}))`
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const ChevronIcon = styled(Feather).attrs(({ theme }) => ({
  color: theme.COLORS.PRIMARY_800,
  size: RFValue(24),
}))``;
