import React, { useState, useCallback } from "react";
import { FlatList, Alert } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { translationFirebaseErrorsPTBR } from "react-translation-firebase-errors";

//Services
import firestore from "@react-native-firebase/firestore";

//Hooks
import { useAuth } from "@hooks/useAuth";

//Components
import { Search } from "@components/Search";
import { ProductCard, ProductData } from "@components/ProductCard";
import { Button } from "@components/Button";

//Styles
import {
  Container,
  Header,
  Greeting,
  GreetingEmoji,
  GreetingLabel,
  ButtonLogOut,
  LogOutIcon,
  MenuHeader,
  Title,
  MenuItemsNumber,
  LoadContainer,
  Load,
  NewProductButton,
} from "./styles";

//PNG
import happyEmojiPng from "@assets/happy.png";

export const Home: React.FC = () => {
  const { user, signOut } = useAuth();
  const { navigate } = useNavigation();

  const [pizzas, setPizzas] = useState<ProductData[]>([]);
  const [search, setSearch] = useState<string>("");

  async function fetchPizzas(value: string) {
    const formattedValue = value.toLocaleLowerCase().trim();

    await firestore()
      .collection("pizzas")
      .orderBy("name_insensitive")
      .startAt(formattedValue)
      .endAt(`${formattedValue}\uf8ff`)
      .get()
      .then((response) => {
        const data = response.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductData[];

        setPizzas(data);
      })
      .catch((err) => {
        const error = translationFirebaseErrorsPTBR(err.code);
        Alert.alert(error);
      });
  }

  function handleSearch() {
    if (!search) {
      Alert.alert("Pesquisa", "Informe a pizza que sera pesquisada.");
    }

    fetchPizzas(search);
  }

  function handleClear() {
    fetchPizzas("");
    setSearch("");
  }

  function handleOpen(productId: string) {
    const route = user?.is_admin ? "Product" : "Order";

    navigate(route, { id: productId });
  }

  function handleAdd() {
    navigate("Product", {});
  }

  function handleSignOut() {
    Alert.alert("Deslogar!", "Quer mesmo encerrar sua sessão?", [
      { text: "Não", style: "cancel" },

      { text: "Sim", onPress: () => signOut() },
    ]);
  }

  useFocusEffect(
    useCallback(() => {
      fetchPizzas("");
    }, [])
  );

  return (
    <Container>
      <Header>
        <Greeting>
          <GreetingEmoji source={happyEmojiPng} />
          <GreetingLabel>
            {user?.is_admin ? "Olá, Admin" : "Olá, Garçom"}{" "}
          </GreetingLabel>
        </Greeting>

        <ButtonLogOut activeOpacity={0.7} onPress={handleSignOut}>
          <LogOutIcon name="logout" />
        </ButtonLogOut>
      </Header>

      <Search
        value={search}
        onChangeText={setSearch}
        onClear={handleClear}
        onSearch={handleSearch}
      />

      <MenuHeader>
        <Title>Cardápio</Title>
        <MenuItemsNumber>0 pizzas</MenuItemsNumber>
      </MenuHeader>

      {pizzas.length === 0 ? (
        <LoadContainer>
          <Load />
        </LoadContainer>
      ) : (
        <FlatList
          data={pizzas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProductCard data={item} onPress={() => handleOpen(item.id)} />
          )}
          contentContainerStyle={{
            paddingTop: 20,
            marginHorizontal: 24,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}

      {user?.is_admin && (
        <NewProductButton>
          <Button
            title="Cadastrar Pizza"
            type="secondary"
            onPress={handleAdd}
          />
        </NewProductButton>
      )}
    </Container>
  );
};
