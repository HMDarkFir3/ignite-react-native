import React from "react";
import { TouchableOpacityProps } from "react-native";

//Styles
import { Container, Title, Load } from "./styles";

//Interfaces
export type TypeProps = "primary" | "secondary";

type Props = TouchableOpacityProps & {
  type?: TypeProps;
  title: string;
  isLoading?: boolean;
};

export const Button: React.FC<Props> = (props) => {
  const {
    type = "primary",
    title,
    isLoading = false,

    ...rest
  } = props;

  return (
    <Container type={type} disabled={isLoading} activeOpacity={0.9} {...rest}>
      {isLoading ? <Load /> : <Title>{title}</Title>}
    </Container>
  );
};
