//React
import React from "react";
import { TextInputProps } from "react-native";

//styled-components
import { useTheme } from "styled-components";

import light from "../../../global/styles/light";

//Styles
import { Container } from "./styles";

//Types
interface Props extends TextInputProps {}

export default function Input(props: Props) {
  const { ...rest } = props;

  const theme = useTheme();

  return <Container placeholderTextColor={theme.colors.text} {...rest} />;
}
