import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";

import ActionItemFormModal from "../components/ActionItem/ActionItemFormModal";
import ActionItemCard from "../components/ActionItem/ActionItemCard";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";

import Colors from "../modules/Colors";
import { getAll } from "../modules/APIManager";

const ActionItemScreen = props => {
  const [actionItems, setActionItems] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const getActionItemsHandler = async () => {
    const allActionItems = await getAll(
      `actionitems?progression=${props.route.params.progressionId}`
    );

    setActionItems(allActionItems);
  };

  const addActionItemHandler = () => setIsFormVisible(true);

  const loadActionItems = async () => {
    await props.route.params.getActionItemCount();
    return await getActionItemsHandler();
  };

  const onAddItem = () => setIsFormVisible(true);

  useEffect(() => {
    if (isFormVisible === false) {
      loadActionItems();
    }
  }, [isFormVisible]);

  let row = [];
  let prevOpenedRow;
  const closeSelf = index => {
    row[index].close();
  };
  const closeRow = index => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close();
    }
    prevOpenedRow = row[index];
  };

  return (
    <ScreenContainer
      style={{ ...styles.screen, ...props.style }}
      onAddItem={onAddItem}>
      <FlatList
        keyExtractor={(item, index) => `${item.id}`}
        style={{ width: "100%" }}
        data={actionItems}
        renderItem={actionItem => (
          <ActionItemCard
            row={row}
            prevOpenedRow={prevOpenedRow}
            closeRow={closeRow}
            closeSelf={closeSelf}
            navigation={props.navigation}
            cardIndex={actionItem.index}
            cardId={actionItem.item.id}
            loadActionItems={loadActionItems}
            actionItem={actionItem.item}
            style={{
              backgroundColor:
                Colors.light.actionCard[actionItem.item.status.name]
            }}
          />
        )}
      />
      <ActionItemFormModal
        onConfirm={() => setIsFormVisible(false)}
        onCancel={() => setIsFormVisible(false)}
        isFormVisible={isFormVisible}
        progressionId={props.route.params.progressionId}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "space-between"
  },
  addButtonText: {
    padding: 3,
    fontSize: 14
    // color: "white"
  }
});

export default ActionItemScreen;
