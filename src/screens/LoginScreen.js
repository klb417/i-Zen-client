import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";

import InputFieldContainer from "../components/Input/InputFieldContainer";
import ScreenContainer from "../components/ScreenComponent/ScreenContainer";
import ZenButton from "../components/ButtonComponent/ZenButton";

import Colors from "../modules/Colors";
import { login } from "../modules/APIManager";

const LoginScreen = props => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    const response = await login({
      username: username,
      password: password
    });

    response && props.setIsAuthenticated(true);
  };

  const passwordRef = useRef();

  return (
    <ScreenContainer style={{ ...styles.screen, ...props.style }}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeMessage}>Welcome to i-Zen!</Text>
        <Text style={styles.welcomeMessage}>Please log in</Text>
      </View>
      <InputFieldContainer
        returnKeyType="next"
        onSubmitEditing={() => passwordRef.current.focus()}
        autoFocus={true}
        placeholder="Username"
        value={username}
        autoCapitalize="none"
        onChangeText={text => setUsername(text)}
      />
      <InputFieldContainer
        setRef={input => (passwordRef.current = input)}
        returnKeyType="done"
        onSubmitEditing={loginHandler}
        placeholder="Password"
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.buttonContainer}>
        <ZenButton
          customStyle={{
            backgroundColor: Colors.light.button.secondary,
            width: 100
          }}
          onPress={() => props.navigation.navigate("Register")}>
          <Text style={styles.buttonText}>Register</Text>
        </ZenButton>
        {/* <Text style={styles.buttonChoiceText}>or</Text> */}
        <ZenButton
          customStyle={{ backgroundColor: Colors.light.button.primary }}
          onPress={loginHandler}>
          <Text style={styles.buttonText}>Login</Text>
        </ZenButton>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 20
  },
  welcomeMessage: {
    fontSize: 30
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  buttonChoiceText: {
    fontSize: 20,
    marginVertical: 20
  },
  buttonText: {
    color: Colors.light.text.primary
  }
});

export default LoginScreen;
