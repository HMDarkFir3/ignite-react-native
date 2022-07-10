//react-native-gesture-handler
import { RectButton } from "react-native-gesture-handler";

//styled-components
import styled from "styled-components/native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton)`
  align-items: center;

  width: 100%;

  padding: 18px;

  background-color: ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
