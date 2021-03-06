// form modal for creating a progression

import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, Alert } from "react-native";

import FormModalContainer from "../Modal/FormModalContainer";
import InputFieldContainer from "../Input/InputFieldContainer";
import ZenButton from "../ButtonComponent/ZenButton";

import Colors from "../../modules/Colors";
import { postItem } from "../../modules/APIManager";

const ProgressionFormModal = props => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const cancelFormHandler = () => {
    setName("");
    setDescription("");
    props.onCancel();
  };

  const confirmFormHandler = async () => {
    if (name === "" || description === "") {
      Alert.alert("Fields cannot be blank");
    } else {
      await postItem("progressions", { name: name, description: description });
      setName("");
      setDescription("");
      props.onConfirm();
    }
  };

  const descriptionRef = useRef(null);

  return (
    <FormModalContainer
      style={{ ...styles.form, ...props.style }}
      isFormVisible={props.isFormVisible}>
      <Text style={styles.formModalHeader}>Add New Progression</Text>
      <View style={styles.formContainer}>
        <Text>What do you want to track?</Text>
        <InputFieldContainer
          autoFocus={true}
          returnKeyType="next"
          onSubmitEditing={() => descriptionRef.current.focus()}
          inputStyle={styles.inputField}
          placeholder="ex: Cooking More Meals"
          value={name}
          onChangeText={setName}
        />
        <Text>Why do you want to improve this?</Text>
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
          <Text style={styles.buttonText}>Add</Text>
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

export default ProgressionFormModal;
