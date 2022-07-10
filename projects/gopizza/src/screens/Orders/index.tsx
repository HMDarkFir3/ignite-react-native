import React, { useState, useEffect } from "react";
import { FlatList, Alert } from "react-native";

//Services
import firestore from "@react-native-firebase/firestore";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Components
import { OrdersCard, OrderProps } from "@components/OrderCard";
import { ItemSeparator } from "@components/ItemSeparator";

//Styles
import { Container, Header, Title } from "./styles";

export const Orders = () => {
  const { user } = useAuth();

  const [orders, setOrders] = useState<OrderProps[]>([]);

  function handlePizzaDelivered(id: string) {
    Alert.alert("Pedido!", "Confirmar que a pizza foi entregue?", [
      { text: "Não", style: "cancel" },
      {
        text: "Sim",
        onPress: () => {
          firestore().collection("orders").doc(id).update({
            status: "Entregue",
          });
        },
      },
    ]);
  }

  useEffect(() => {
    const subscribe = firestore()
      .collection("orders")
      .where("waiter_id", "==", user?.id)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as OrderProps[];

        setOrders(data);
      });

    return () => subscribe();
  }, []);

  return (
    <Container>
      <Header>
        <Title>Pedidos feitos</Title>
      </Header>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <OrdersCard
            index={index}
            data={item}
            disabled={
              item.status === "Entregue" || item.status === "Preparando"
            }
            onPress={() => handlePizzaDelivered(item.id)}
          />
        )}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 124 }}
        ItemSeparatorComponent={() => <ItemSeparator />}
      />
    </Container>
  );
};
