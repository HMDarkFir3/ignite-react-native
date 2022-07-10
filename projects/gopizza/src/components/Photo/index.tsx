import React from "react";

//Styles
import { Image, Placeholder, PlaceholderTitle } from "./styles";

//Interfaces
type Props = {
  uri: string | null;
};

export const Photo: React.FC<Props> = (props) => {
  const { uri } = props;

  if (uri) {
    return <Image source={{ uri: uri }} />;
  }

  return (
    <Placeholder>
      <PlaceholderTitle>Nenhuma foto{"\n"}carregada</PlaceholderTitle>
    </Placeholder>
  );
};
