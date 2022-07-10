//React
import React from "react";

//Styles
import { Container, Title, Amount } from "./styles";

//Types
interface Props {
  title: string;
  amount: string;
  color: string;
}

export default function HistoryCard(props: Props) {
  const { title, amount, color } = props;

  return (
    <Container color={color}>
      <Title>{title}</Title>
      <Amount>{amount}</Amount>
    </Container>
  );
}
