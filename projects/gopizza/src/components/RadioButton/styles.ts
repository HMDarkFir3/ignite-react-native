import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export type RadioButtonProps = {
  isSelected: boolean;
};

export const Container = styled.TouchableOpacity<RadioButtonProps>`
  width: 104px;
  height: 82px;

  padding: 12px 16px;

  border-radius: 8px;

  ${({ theme, isSelected }) => css`
    background-color: ${isSelected
      ? theme.COLORS.SUCCESS_50
      : theme.COLORS.TITLE};
    border: 1px solid
      ${isSelected ? theme.COLORS.SUCCESS_900 : theme.COLORS.SHAPE};
  `}
`;

export const Radio = styled.View`
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  margin-bottom: 16px;

  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const RadioSelected = styled.View`
  width: 8px;
  height: 8px;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
  border-radius: 4px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
