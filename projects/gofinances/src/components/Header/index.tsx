//React
import React from "react";

//Styles
import { Container, Title } from "./styles";

//Types
interface Props {
  title: string;
}

export default function Header(props: Props) {
  const { title } = props;

  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
}
