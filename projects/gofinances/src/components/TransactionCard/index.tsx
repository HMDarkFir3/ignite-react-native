//React
import React from "react";

//Utils
import { categories } from "../../utils/categories";

//Styles
import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from "./styles";

//Types
export type TransactionCardProps = {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
};

type Props = {
  data: TransactionCardProps;
};

export default function TransactionCard(props: Props) {
  const { data } = props;

  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <Title>{data.name}</Title>
      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
