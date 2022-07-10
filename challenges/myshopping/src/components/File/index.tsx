import React from "react";

import { ButtonIcon } from "../ButtonIcon";
import { Container, Info, Name, Path, Options } from "./styles";

export type FileProps = {
  name: string;
  path: string;
};

type Props = {
  data: FileProps;
  onShow?: () => void;
  onDelete?: () => void;
};

export function File({ data, onShow, onDelete }: Props) {
  return (
    <Container>
      <Info>
        <Name>{data.name}</Name>
        <Path>{data.path}</Path>
      </Info>

      <Options>
        <ButtonIcon icon="visibility" onPress={onShow} />

        <ButtonIcon icon="delete" color="alert" onPress={onDelete} />
      </Options>
    </Container>
  );
}
