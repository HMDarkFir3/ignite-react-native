import React, { useState } from "react";
import { Alert } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { Container } from "./styles";
import { ButtonIcon } from "../ButtonIcon";
import { Input } from "../Input";

export function FormBox() {
  const [productName, setProductName] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");

  async function handleProductAdd() {
    if (productName === "" || quantity === "") {
      Alert.alert(
        "Atencão!",
        "Preencha os campos para adicionar algum produto."
      );
      return;
    }

    firestore()
      .collection("products")
      .add({
        product_name: productName,
        quantity,
        done: false,
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setProductName("");
        setQuantity("");
      })
      .catch((err) => {
        Alert.alert(err.code);
      });
  }

  return (
    <Container>
      <Input
        placeholder="Nome do produto"
        size="medium"
        onChangeText={setProductName}
        value={productName}
      />

      <Input
        placeholder="0"
        keyboardType="numeric"
        size="small"
        style={{ marginHorizontal: 8 }}
        onChangeText={setQuantity}
        value={quantity}
      />

      <ButtonIcon
        size="large"
        icon="add-shopping-cart"
        onPress={handleProductAdd}
      />
    </Container>
  );
}
