import React from "react";
import { TextInputProps } from "react-native";

//Styles
import {
  Container,
  InputArea,
  Input,
  ButtonClear,
  ClearIcon,
  ButtonSearch,
  SearchIcon,
} from "./styles";

//Interfaces
type Props = TextInputProps & {
  onClear: () => void;
  onSearch: () => void;
};

export const Search: React.FC<Props> = (props) => {
  const { onClear, onSearch, ...rest } = props;

  return (
    <Container>
      <InputArea>
        <Input placeholder="Pesquisar" {...rest} />

        <ButtonClear activeOpacity={0.7} onPress={onClear}>
          <ClearIcon name="x" />
        </ButtonClear>
      </InputArea>

      <ButtonSearch activeOpacity={0.7} onPress={onSearch}>
        <SearchIcon name="search" />
      </ButtonSearch>
    </Container>
  );
};
