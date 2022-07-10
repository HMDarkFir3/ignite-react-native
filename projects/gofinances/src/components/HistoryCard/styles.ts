//styled-components
import styled from "styled-components/native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

//Types
interface Props {
  color: string;
}

export const Container = styled.View<Props>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-bottom: 10px;
  padding: 13px 24px;

  background-color: ${({ theme }) => theme.colors.shape};
  border-left-width: 5px;
  border-left-color: ${({ color }) => color};
  border-radius: 5px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(15)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(15)}px;
`;
