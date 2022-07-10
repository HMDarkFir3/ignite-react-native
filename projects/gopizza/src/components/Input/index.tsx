import React, { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import { Container } from "./styles";

//Interfaces
export type TypeProps = "primary" | "secondary";

type Props = TextInputProps & {
  type?: TypeProps;
  color?: string;
};

const Input: React.ForwardRefRenderFunction<TextInput, Props> = (
  props,
  ref
) => {
  const { type = "primary", color = "transparent", ...rest } = props;

  return <Container ref={ref} type={type} color={color} {...rest} />;
};

export default forwardRef(Input);
