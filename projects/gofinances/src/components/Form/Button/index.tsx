//React
import React from "react";

//react-native-gesture-handler
import { RectButtonProps } from "react-native-gesture-handler";

//Styles
import { Container, Title } from "./styles";

//Types
interface Props extends RectButtonProps {
  title: string;
  onPress: () => void;
}

export default function Button(props: Props) {
  const { title, onPress, ...rest } = props;

  return (
    <Container onPress={onPress}>
      <Title>{title}</Title>
    </Container>
  );
}
