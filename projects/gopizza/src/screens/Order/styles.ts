import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
`;

export const ContentScroll = styled.ScrollView.attrs(({}) => ({
  showsVerticalScrollIndicator: false,
}))`
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND};
`;

export const Header = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
}))`
  padding: ${getStatusBarHeight() + 32}px 24px;
`;

export const Photo = styled.Image`
  position: relative;
  top: -120px;
  align-self: center;

  width: 240px;
  height: 240px;

  border-radius: 120px;
`;

export const Form = styled.View`
  width: 100%;

  margin-top: -120px;
  padding: 24px;
`;

export const Title = styled.Text`
  margin-bottom: 32px;

  text-align: center;
  font-size: ${RFValue(32)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Sizes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 40px;
`;

export const FormRow = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
`;

export const InputGroup = styled.View`
  width: 48%;
`;

export const Label = styled.Text`
  margin-bottom: 16px;

  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const Price = styled.Text`
  align-self: flex-end;

  margin: 24px 0;

  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;
