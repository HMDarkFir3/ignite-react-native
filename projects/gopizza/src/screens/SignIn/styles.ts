import styled, { css } from "styled-components/native";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { RFValue } from "react-native-responsive-fontsize";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled(LinearGradient).attrs(({ theme }) => ({
  colors: theme.COLORS.GRADIENT,
  start: { x: 0, y: 1 },
  end: { x: 0.5, y: 0.5 },
}))`
  flex: 1;
  justify-content: center;
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;

  padding: 0 32px;
`;

export const BrandWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Brand = styled.Image.attrs({
  resizeMode: "contain",
})`
  height: ${RFValue(340)}px;

  margin-top: 64px;
  margin-bottom: 32px;
`;

export const Title = styled.Text`
  align-self: flex-start;

  margin-bottom: 24px;

  font-size: ${RFValue(32)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const ForgotPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;

  margin-bottom: 20px;
`;

export const ForgotPasswordLabel = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.TITLE};
  `}
`;
