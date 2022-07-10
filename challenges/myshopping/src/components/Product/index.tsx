import React from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Title, Quantity, Options } from "./styles";

export type ProductProps = {
  id: string;
  product_name: string;
  quantity: number;
  done: boolean;
};

type Props = {
  data: ProductProps;
};

export function Product({ data }: Props) {
  function handleDoneToggle() {
    firestore()
      .collection("products")
      .doc(data.id)
      .update({
        done: !data.done,
      })
      .catch((err) => {
        console.error(err.code);
      });
  }

  function handleDeleteProduct() {
    Alert.alert(
      "Atenção!",
      `Deseja remover:\n${data.product_name} - quantidade: ${data.quantity}`,
      [
        {
          text: "Não",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () =>
            firestore().collection("products").doc(data.id).delete(),
        },
      ]
    );
  }

  return (
    <Container>
      <Info>
        <Title done={data.done}>{data.product_name}</Title>

        <Quantity>Quantidade: {data.quantity}</Quantity>
      </Info>

      <Options>
        <ButtonIcon
          icon={data.done ? "undo" : "check"}
          onPress={handleDoneToggle}
        />

        <ButtonIcon icon="delete" color="alert" onPress={handleDeleteProduct} />
      </Options>
    </Container>
  );
}
