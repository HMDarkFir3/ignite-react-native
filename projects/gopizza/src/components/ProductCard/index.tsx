import React from "react";
import { TouchableOpacityProps } from "react-native";

//Styles
import {
  Container,
  Content,
  Image,
  Details,
  Identification,
  Name,
  ChevronIcon,
  Description,
  Line,
} from "./styles";

//Interfaces
export type ProductData = {
  id: string;
  photo_url: string;
  name: string;
  description: string;
};

type Props = TouchableOpacityProps & {
  data: ProductData;
  handleOpen?: (productId: string) => void;
};

export const ProductCard: React.FC<Props> = (props) => {
  const { id, photo_url, name, description } = props.data;
  const { ...rest } = props;

  return (
    <Container>
      <Content activeOpacity={0.7} {...rest}>
        <Image source={{ uri: photo_url }} />

        <Details>
          <Identification>
            <Name>{name}</Name>
            <ChevronIcon name="chevron-right" />
          </Identification>

          <Description>{description}</Description>
        </Details>
      </Content>

      <Line />
    </Container>
  );
};
