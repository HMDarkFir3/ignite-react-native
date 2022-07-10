import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Image = styled.Image`
  width: 160px;
  height: 160px;

  border-radius: 80px;
`;

export const Placeholder = styled.View`
  align-items: center;
  justify-content: center;

  width: 160px;
  height: 160px;

  border-radius: 80px;
  border: 1px dashed ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const PlaceholderTitle = styled.Text`
  text-align: center;
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
