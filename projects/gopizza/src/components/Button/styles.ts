import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

//Interfaces
import { TypeProps } from ".";

type ContainerProps = {
  type: TypeProps;
};

export const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-height: 56px;
  min-height: 56px;

  background-color: ${({ theme, type }) =>
    type === "primary" ? theme.COLORS.SUCCESS_900 : theme.COLORS.PRIMARY_800};
  border-radius: 12px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  color: theme.COLORS.TITLE,
}))``;
