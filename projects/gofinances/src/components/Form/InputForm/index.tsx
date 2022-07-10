//React
import React from "react";
import { TextInputProps } from "react-native";

//React Hook Form
import { Control, Controller } from "react-hook-form";

//Components
import Input from "../../Form/Input";

//Styles
import { Container, Error } from "./styles";

//Types
interface Props extends TextInputProps {
  control: Control;
  name: string;
  error: string;
}

export default function InputForm(props: Props) {
  const { control, name, error, ...rest } = props;

  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input onChangeText={onChange} value={value} {...rest} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
}
