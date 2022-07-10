//React
import React from "react";
import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

//Styles
import { styles } from "./styles";

//Types
type Props = TouchableOpacityProps & {
  title: string;
  backgroundColor: string;
  borderRadius: number;
  cardStyle?: boolean;
};

export default function Button(props: Props) {
  const { title, backgroundColor, borderRadius, cardStyle, ...rest } = props;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: backgroundColor,
          borderRadius: borderRadius,
          marginBottom: cardStyle === true ? 15 : 0,
        },
      ]}
      activeOpacity={0.7}
      {...rest}
    >
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
}
