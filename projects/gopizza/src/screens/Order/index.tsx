import React, { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { translationFirebaseErrorsPTBR } from "react-translation-firebase-errors";

//Services
import firestore from "@react-native-firebase/firestore";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Components
import { ButtonBack } from "@components/ButtonBack";
import { RadioButton } from "@components/RadioButton";
import Input from "@components/Input";
import { Button } from "@components/Button";

//Utils
import { PIZZA_TYPES } from "@utils/pizzaTypes";

//Styles
import {
  Container,
  ContentScroll,
  Header,
  Photo,
  Form,
  Title,
  Sizes,
  FormRow,
  InputGroup,
  Label,
  Price,
} from "./styles";

//Types
import { OrderNavigationProps } from "@src/@types/react-navigation";

type PizzaResponse = OrderNavigationProps & {
  name: string;
  photo_url: string;
  prices_sizes: {
    [key: string]: number;
  };
};

export const Order: React.FC = () => {
  const { user } = useAuth();
  const { navigate, goBack } = useNavigation();
  const route = useRoute();
  const { id } = route.params as OrderNavigationProps;

  const [pizza, setPizza] = useState<PizzaResponse>({} as PizzaResponse);
  const [size, setSize] = useState<string>("");
  const [tableNumber, setTableNumber] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [sendingOrder, setSendingOrder] = useState<boolean>(false);

  const amount = size ? pizza.prices_sizes[size] * quantity : "0,00";

  function handleBackButton() {
    goBack();
  }

  async function handleOrder() {
    if (!size) {
      return Alert.alert("Pedido!", "Selecione o tamanho da pizza.");
    }

    if (!tableNumber) {
      return Alert.alert("Pedido!", "Informe o número da mesa.");
    }

    if (!quantity) {
      return Alert.alert("Pedido!", "Informe a quantidade.");
    }

    setSendingOrder(true);

    await firestore()
      .collection("orders")
      .add({
        pizza: pizza.name,
        amount,
        size,
        quantity,
        table_number: tableNumber,
        created_at: new Date(),
        status: "Preparando",
        waiter_id: user?.id,
        image: pizza.photo_url,
      })
      .then(() => {
        navigate("Home");
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  useEffect(() => {
    if (id) {
      firestore()
        .collection("pizzas")
        .doc(id)
        .get()
        .then((response) => {
          setPizza(response.data() as PizzaResponse);
        })
        .catch((err) => {
          const error = translationFirebaseErrorsPTBR(err.code);
          Alert.alert(error);
        });
    }
  }, []);

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ContentScroll>
        <Header>
          <ButtonBack
            onPress={handleBackButton}
            style={{ marginBottom: 108 }}
          />
        </Header>

        <Photo source={{ uri: pizza.photo_url }} />

        <Form>
          <Title>{pizza.name}</Title>

          <Label>Selecione um tamanho</Label>
          <Sizes>
            {PIZZA_TYPES.map((item) => (
              <RadioButton
                key={item.id}
                title={item.name}
                isSelected={size === item.id}
                onPress={() => setSize(item.id)}
              />
            ))}
          </Sizes>

          <FormRow>
            <InputGroup>
              <Label>Número da mesa</Label>
              <Input
                keyboardType="numeric"
                value={tableNumber}
                onChangeText={setTableNumber}
              />
            </InputGroup>

            <InputGroup>
              <Label>Quantidade</Label>
              <Input
                keyboardType="numeric"
                value={String(quantity)}
                onChangeText={(value) => setQuantity(Number(value))}
              />
            </InputGroup>
          </FormRow>

          <Price>Valor de R$ {amount}</Price>

          <Button
            title="Confirmar Pedido"
            isLoading={sendingOrder}
            onPress={handleOrder}
          />
        </Form>
      </ContentScroll>
    </Container>
  );
};
