//React
import React from "react";

//react-native-gesture-handler
import { RectButtonProps } from "react-native-gesture-handler";

//react-native-svg
import { SvgProps } from "react-native-svg";

//Styles
import { Container, ImageContainer, Title } from "./styles";

//Types
interface Props extends RectButtonProps {
  title: string;
  svg: React.FC<SvgProps>;
}

export default function SignInSocialButton(props: Props) {
  const { title, svg: Svg, ...rest } = props;

  return (
    <Container {...rest}>
      <ImageContainer>
        <Svg />
      </ImageContainer>
      <Title>{title}</Title>
    </Container>
  );
}
