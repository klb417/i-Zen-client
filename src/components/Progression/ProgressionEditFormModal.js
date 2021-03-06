// form modal for editing a progression

import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

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
    if (name === "") {
      Alert.alert("Name cannot be blank");
    } else if (description === "") {
      Alert.alert("Description cannot be blank");
    } else {
      await putItem("progressions", props.cardId, {
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
    }
  };

  const getProgressionDetails = async () => {
    const details = await getOne("progressions", props.cardId);
    setName(details.name);
    setDescription(details.description);
  };

  useEffect(() => {
    if (props.isEditFormVisible === true) {
      getProgressionDetails();
    }
  }, [props.isEditFormVisible]);

  const descriptionRef = useRef(null);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isEditFormVisible}>
      <Text style={styles.formModalHeader}>Edit Progression</Text>
      <View style={styles.formContainer}>
        <Text>Name</Text>
        <InputFieldContainer
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          inputStyle={styles.inputField}
          placeholder="ex: Cooking More Meals"
          value={name}
          required={true}
          onChangeText={setName}
        />
        <Text>Description</Text>
        <InputFieldContainer
          setRef={input => (descriptionRef.current = input)}
          returnKeyType="done"
          onSubmitEditing={confirmFormHandler}
          inputStyle={styles.inputField}
          placeholder="ex: To stop eating so much fast food"
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.secondary }}
          onPress={cancelFormHandler}>
          <Text style={styles.buttonText}>Cancel</Text>
        </ZenButton>
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={confirmFormHandler}>
          <Text style={styles.buttonText}>Save</Text>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  buttonText: {
    color: Colors.light.text.primary
  }
});

export default ProgressionEditFormModal;
