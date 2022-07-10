//React
import React from "react";
import {
  FlatList,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

//Components
import Header from "../../components/Header";
import SeparatorItem from "../../components/SeparatorItem";
import Button from "../../components/Form/Button";

//Utils
import { categories } from "../../utils/categories";

//Styles
import { Container, Category, Icon, Label, Footer } from "./styles";

//Types
export interface CategoryProps {
  key: string;
  name: string;
}

interface Props {
  category: CategoryProps;
  setCategory: (category: CategoryProps) => void;
  closeSelectCategory: () => void;
}

export default function CategorySelect(props: Props) {
  const { category, setCategory, closeSelectCategory } = props;

  function handleCategorySelect(category: CategoryProps) {
    setCategory(category);
  }

  return (
    <Container>
      <Header title="Categoria" />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <Category
            isActive={category.key === item.key}
            onPress={() => handleCategorySelect(item)}
          >
            <Icon name={item.icon} />
            <Label>{item.name}</Label>
          </Category>
        )}
        ItemSeparatorComponent={() => <SeparatorItem />}
        style={{ flex: 1, width: "100%" }}
      />

      <Footer>
        <Button title="Selecionar" onPress={closeSelectCategory} />
      </Footer>
    </Container>
  );
}
