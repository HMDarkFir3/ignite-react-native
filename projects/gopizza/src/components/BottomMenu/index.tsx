import React from "react";

//Styles
import { Container, Title, Notification, Quantity } from "./styles";

//Types
type Props = {
  title: string;
  color: string;
  notification?: string | undefined;
};

export const BottomMenu: React.FC<Props> = (props) => {
  const { title, color, notification } = props;

  const noNotification = notification === "0";

  return (
    <Container>
      <Title color={color}>{title}</Title>
      {notification && (
        <Notification noNotification={noNotification}>
          <Quantity noNotification={noNotification}>{notification}</Quantity>
        </Notification>
      )}
    </Container>
  );
};
