//React
import React from "react";

//react-native-gesture-handler
import { RectButtonProps } from "react-native-gesture-handler";

//Styles
import { Container, Category, Icon } from "./styles";

//Types
interface Props extends RectButtonProps {
  title: string;
}

export default function CategorySelectButton(props: Props) {
  const { title, ...rest } = props;

  return (
    <Container {...rest}>
      <Category>{title}</Category>
      <Icon name="chevron-down" />
    </Container>
  );
}
