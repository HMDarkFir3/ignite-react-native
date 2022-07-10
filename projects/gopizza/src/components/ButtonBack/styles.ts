import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

//Icons
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;

  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.COLORS.PRIMARY_100};
`;

export const ChevronIcon = styled(MaterialIcons)`
  font-size: ${RFValue(18)}px;
  color: ${({ theme }) => theme.COLORS.TITLE};
`;
