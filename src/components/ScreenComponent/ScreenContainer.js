// container for screens for consistent styling

import React from "react";
import { StyleSheet, View, Text } from "react-native";
import FooterComponent from "../Footer/FooterComponent";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";

const ScreenContainer = props => {
  return (
    <>
      <View style={{ ...styles.screen, ...props.style }}>{props.children}</View>
      <FooterComponent>
        {props.onOpenActionItems && (
          <ZenButton
            customStyle={{
              width: 150,
              backgroundColor: Colors.light.button.secondary,
              flex: 1
            }}
            onPress={props.onOpenActionItems}>
            <Text style={styles.addButtonText}>Action Items</Text>
          </ZenButton>
        )}
        {props.onAddItem && (
          <ZenButton
            customStyle={{
              backgroundColor: Colors.light.button.primary,
              flex: 1
            }}
            onPress={props.onAddItem}>
            <Text style={styles.addButtonText}>Add</Text>
          </ZenButton>
        )}
      </FooterComponent>
    </>
  );
};

const styles = StyleSheet.create({
  screen: {
    borderTopWidth: 1,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  addButtonText: {
    color: Colors.light.text.primary
  }
});

export default ScreenContainer;
