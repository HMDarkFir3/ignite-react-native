//React
import { StyleSheet, Platform } from "react-native";

//Styles
import colors from "../../global/colors";

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingVertical: 50,
    paddingHorizontal: 25,

    backgroundColor: colors.darkGray,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  greetings: {
    fontSize: 20,
    color: colors.white,
  },
  input: {
    marginTop: 30,
    marginBottom: 20,
    padding: Platform.OS === "ios" ? 15 : 12,

    fontSize: 18,
    color: colors.white,

    backgroundColor: colors.lightGray,
    borderRadius: 7,
  },
});
