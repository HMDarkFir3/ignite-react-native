import styled, { css } from "styled-components/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
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

  padding: ${getStatusBarHeight() + 32}px 24px 58px;
`;

export const Greeting = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GreetingEmoji = styled.Image`
  width: 32px;
  height: 32px;

  margin-right: 12px;
`;

export const GreetingLabel = styled.Text`
  font-size: ${RFValue(20)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.TITLE};
  `}
`;

export const ButtonLogOut = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const LogOutIcon = styled(MaterialIcons)`
  font-size: ${RFValue(24)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;

export const MenuHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 24px 24px 0;
  padding-bottom: 24px;

  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.COLORS.SHAPE};
`;

export const Title = styled.Text`
  font-size: ${RFValue(22)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TITLE};
    color: ${theme.COLORS.SECONDARY_900};
  `}
`;

export const MenuItemsNumber = styled.Text`
  font-size: ${RFValue(14)}px;

  ${({ theme }) => css`
    font-family: ${theme.FONTS.TEXT};
    color: ${theme.COLORS.SECONDARY_900};
  `}
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

export const NewProductButton = styled.View`
  padding: 0 24px;
  margin-bottom: ${getBottomSpace() + 80}px;
`;
