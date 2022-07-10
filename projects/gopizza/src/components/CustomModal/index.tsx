import React, { ReactNode } from "react";
import { ModalProps } from "react-native";

//Styles
import { Container } from "./styles";

//Intefaces
type Props = ModalProps & {
  children: ReactNode;
};

export const CustomModal: React.FC<Props> = (props) => {
  const { children, ...rest } = props;

  return (
    <Container animationType="slide" {...rest}>
      {children}
    </Container>
  );
};
