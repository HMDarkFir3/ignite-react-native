import React from "react";
import { TouchableOpacityProps } from "react-native";

//Styles
import { Container, ChevronIcon } from "./styles";

//Interface
type Props = TouchableOpacityProps & {};

export const ButtonBack: React.FC<Props> = (props) => {
  const { ...rest } = props;

  return (
    <Container activeOpacity={0.7} {...rest}>
      <ChevronIcon name="chevron-left" />
    </Container>
  );
};
