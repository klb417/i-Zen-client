// form modal for editing a progression

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { putItem, getOne } from "../../modules/APIManager";

const ProgressionEditFormModal = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [createdById, setCreatedById] = useState("");

  const cancelFormHandler = () => {
    setName("");
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    await putItem("progressions", props.cardIndex, {
      name: name,
      description: description,
      created_at: createdAt,
      created_by_id: createdById
    });
    setName("");
    setDescription("");
    setCreatedAt("");
    setCreatedById("");
    props.onConfirm();
  };

  const getProgressionDetails = async () => {
    const details = await getOne("progressions", props.cardIndex);
    setName(details.name);
    setDescription(details.description);
  };

  useEffect(() => {
    if (props.isEditFormVisible === true) {
      getProgressionDetails();
    }
  }, [props.isEditFormVisible]);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isEditFormVisible}>
      <Text style={styles.formModalHeader}>Edit Progression</Text>
      <View style={styles.formContainer}>
        <Text>What do you want to track?</Text>
        <InputFieldContainer
          inputStyle={styles.inputField}
          placeholder="ex: Cooking More Meals"
          value={name}
          // autoCapitalize="none"
          onChangeText={setName}
        />
        <Text>Why do you want to improve this?</Text>
        <InputFieldContainer
          inputStyle={styles.inputField}
          placeholder="ex: To stop eating so much fast food"
          value={description}
          // autoCapitalize="none"
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.secondary }}
          onPress={cancelFormHandler}>
          <Text>Cancel</Text>
        </ZenButton>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={confirmFormHandler}>
          <Text>Add</Text>
        </ZenButton>
      </View>
    </FormModalContainer>
  );
};

const styles = StyleSheet.create({
  form: {
    justifyContent: "flex-start"
  },
  formModalHeader: {
    fontSize: 22,
    marginVertical: 10,
    marginBottom: 20
  },
  formContainer: {
    alignItems: "center"
  },
  inputField: {
    width: "85%"
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // width: "80%",
    marginTop: 20
  }
});

export default ProgressionEditFormModal;