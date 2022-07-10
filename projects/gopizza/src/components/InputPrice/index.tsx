import React from "react";
import { TextInputProps } from "react-native";

//Styles
import { Container, Size, SizeLabel, Input } from "./styles";

//Interfaces
type Props = TextInputProps & {
  size: string;
};

export const InputPrice: React.FC<Props> = (props) => {
  const { size, ...rest } = props;

  return (
    <Container>
      <Size>
        <SizeLabel>{size}</SizeLabel>
      </Size>

      <Input keyboardType="numeric" placeholder="R$" {...rest} />
    </Container>
  );
};
