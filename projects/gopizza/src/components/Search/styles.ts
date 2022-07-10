import styled, { css } from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

//Icons
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  margin-top: -30px;
  padding: 0 24px;
`;

export const InputArea = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;

  border-radius: 16px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};
    border: 1px solid ${theme.COLORS.SHAPE};
  `}
`;

export const Input = styled(TextInput)`
  flex: 1;

  height: 52px;

  padding: 0 12px;

  border-radius: 16px;

  ${({ theme }) => css`
    background-color: ${theme.COLORS.TITLE};

    font-family: ${theme.FONTS.TEXT};
  `}
`;

export const ButtonClear = styled.TouchableOpacity`
  margin-right: 8px;
`;

export const ClearIcon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.SECONDARY_900};
`;

export const ButtonSearch = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  margin-left: 8px;

  background-color: ${({ theme }) => theme.COLORS.SUCCESS_900};
  border-radius: 18px;
`;

export const SearchIcon = styled(Feather)`
  font-size: ${RFValue(16)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;
