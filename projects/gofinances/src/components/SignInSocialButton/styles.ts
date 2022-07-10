//
import { RectButton } from "react-native-gesture-handler";

//styled-components
import styled from "styled-components/native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: ${RFValue(56)}px;

  margin-bottom: 16px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;

export const ImageContainer = styled.View`
  align-items: center;
  justify-content: center;

  height: 100%;

  padding: ${RFValue(16)}px;

  border-right-width: 1px;
  border-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  flex: 1;

  text-align: center;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
`;
