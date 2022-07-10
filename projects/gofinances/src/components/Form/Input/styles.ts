//React
import { TextInput } from "react-native";

//styled-components
import styled from "styled-components/native";

//react-native-responsive-fontsize
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
  width: 100%;

  margin-bottom: 8px;
  padding: 16px 18px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.title};

  background-color: ${({ theme }) => theme.colors.shape};
  border-radius: 5px;
`;
