import React from "react";
import { TouchableOpacityProps } from "react-native";

//Styles
import {
  RadioButtonProps,
  Container,
  Radio,
  RadioSelected,
  Title,
} from "./styles";

type Props = TouchableOpacityProps &
  RadioButtonProps & {
    title: string;
  };

export const RadioButton: React.FC<Props> = (props) => {
  const { title, isSelected = false, ...rest } = props;

  return (
    <Container isSelected={isSelected} {...rest}>
      <Radio>{isSelected && <RadioSelected />}</Radio>
      <Title>{title}</Title>
    </Container>
  );
};
