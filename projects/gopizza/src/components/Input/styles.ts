import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//Interfaces
import { TypeProps } from ".";

type TextInputProps = {
  type: TypeProps;
  color: string;
};

export const Container = styled(TextInput).attrs<TextInputProps>(
  ({ theme, type }) => ({
    placeholderTextColor:
      type === "primary" ? theme.COLORS.SECONDARY_900 : theme.COLORS.PRIMARY_50,
  })
)<TextInputProps>`
  width: 100%;
  height: 56px;

  margin-bottom: 16px;
  padding: 7px 20px;

  font-family: ${({ theme }) => theme.FONTS.TEXT};
  font-size: ${RFValue(14)}px;

  background-color: ${({ color }) => color};
  border-radius: 12px;

  ${({ theme, type }) => css`
    color: ${type === "primary"
      ? theme.COLORS.SECONDARY_900
      : theme.COLORS.TITLE};

    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;
