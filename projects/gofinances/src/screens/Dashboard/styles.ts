//React
import { FlatList } from "react-native";

//react-native
import { BorderlessButton } from "react-native-gesture-handler";

//styled-components
import styled from "styled-components/native";

//react-native-responsive-fontsize
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

//react-native-iphone-x-helper
import {
  getStatusBarHeight,
  getBottomSpace,
} from "react-native-iphone-x-helper";

//Icons
import { Feather } from "@expo/vector-icons";

//Types
import { DataListProps } from ".";

export const Container = styled.View`
  flex: 1;

  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  width: 100%;
  height: ${RFPercentage(42)}px;

  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-top: ${getStatusBarHeight()}px;
  padding: 0 24px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;

  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18) + "px"};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const UserName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(18) + "px"};
  line-height: 24px;
  color: ${({ theme }) => theme.colors.shape};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  font-size: ${RFValue(26) + "px"};
  color: ${({ theme }) => theme.colors.secondary};
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  position: absolute;

  width: 100%;

  margin-top: ${RFPercentage(16)}px;
`;

export const Transactions = styled.View`
  flex: 1;

  margin-top: ${RFPercentage(10)}px;
  padding: 0 24px;
`;

export const Title = styled.Text`
  margin-bottom: ${RFValue(16)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.title};
`;

export const TransactionsList = styled(
  FlatList as new () => FlatList<DataListProps>
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace(),
  },
})``;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
