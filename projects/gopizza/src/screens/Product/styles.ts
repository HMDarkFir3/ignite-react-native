import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

//Components
import { Button } from "@components/Button";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  padding: ${getStatusBarHeight() + 32}px 20px 24px;
`;

export const LoadContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Load = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: "large",
  color: theme.COLORS.PRIMARY_800,
}))``;

export const Scroller = styled.ScrollView.attrs(() => ({
  showsVerticalScrollIndicator: false,
}))``;

export const Title = styled.Text`
  font-size: ${RFValue(24)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const DeleteButton = styled.TouchableOpacity.attrs(() => ({
  activeOpacity: 0.7,
}))``;

export const DeleteLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const Upload = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;

  margin: 32px 0;
`;

export const PickImageButton = styled(Button)`
  max-width: 90px;

  margin-left: 32px;
`;

export const Form = styled.View`
  width: 100%;
  padding: 0 24px;
`;

export const InputGroup = styled.View`
  width: 100%;

  margin-bottom: 16px;
`;

export const InputGroupHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;
`;

export const FormLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const MaxCharacters = styled.Text`
  font-size: ${RFValue(10)}px;

  margin-bottom: 12px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
