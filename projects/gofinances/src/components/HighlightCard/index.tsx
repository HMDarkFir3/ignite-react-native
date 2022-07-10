//React
import React from "react";

//Styles
import {
  Container,
  Header,
  Title,
  Icon,
  Footer,
  Amount,
  LastTransaction,
} from "./styles";

//Types
interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export default function HighlightCard(props: Props) {
  const { type, title, amount, lastTransaction } = props;

  const icon = {
    up: "arrow-up-circle",
    down: "arrow-down-circle",
    total: "dollar-sign",
  };

  return (
    <Container type={type}>
      <Header>
        <Title type={type}>{title}</Title>
        <Icon name={icon[type]} type={type} />
      </Header>

      <Footer>
        <Amount type={type}>{amount}</Amount>
        <LastTransaction type={type}>{lastTransaction}</LastTransaction>
      </Footer>
    </Container>
  );
}
