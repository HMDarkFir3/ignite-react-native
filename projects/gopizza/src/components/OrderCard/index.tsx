import React from "react";
import { TouchableOpacityProps } from "react-native";

//Styles
import {
  StatusTypesProps,
  Container,
  Photo,
  Name,
  Description,
  StatusContainer,
  StatusLabel,
} from "./styles";

//Types
export type OrderProps = {
  id: string;
  pizza: string;
  image: string;
  status: StatusTypesProps;
  table_number: string;
  quantity: number;
};

type Props = TouchableOpacityProps & {
  index: number;
  data: OrderProps;
};

export const OrdersCard: React.FC<Props> = (props) => {
  const { index, ...rest } = props;
  const { image, pizza, table_number, quantity, status } = props.data;

  return (
    <Container index={index} activeOpacity={0.7} {...rest}>
      <Photo source={{ uri: image }} />

      <Name>{pizza}</Name>
      <Description>
        Mesa {table_number} - Qnt: {quantity}
      </Description>

      <StatusContainer status={status}>
        <StatusLabel status={status}>{status}</StatusLabel>
      </StatusContainer>
    </Container>
  );
};
