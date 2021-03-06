// generic button template for consistent styling

import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from "../../modules/Colors";

const ZenButton = ({ customStyle, ...props }) => {
  let buttonStyle = [];
  buttonStyle = buttonStyle.concat(styles.zenButton);

  buttonStyle = customStyle ? buttonStyle.concat(customStyle) : buttonStyle;

  return (
    <TouchableOpacity activeOpacity={0.6} style={buttonStyle} {...props}>
      <Text style={styles.buttonText}>{props.children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  zenButton: {
    paddingHorizontal: 8,
    // flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    height: 45,
    width: 75,
    margin: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.light.background.header,
    borderWidth: 1,
    borderRadius: 25,
    borderColor: "#333333",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    padding: 3,
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  }
});

export default ZenButton;
