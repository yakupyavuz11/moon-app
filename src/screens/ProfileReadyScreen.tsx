import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import theme, { COLORS } from "../constants/theme";
import { CommonActions, useNavigation } from '@react-navigation/native';

const ProfileReadyScreen = () => {
  const navigation = useNavigation();

  console.info(navigation.getState());
  
  const handleAccept = () => {    
    navigation.replace('Login'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Before the Chat</Text>
      <Text style={styles.text}>
        Welcome! Even though you remain anonymous, we would like to remind you
        that you are responsible for the messages you send to other users.
      </Text>
      <Text style={styles.text}>
        Here, you should chat with kindness and respect, regardless of race,
        nationality, ethnicity, gender, gender identity, or sexual preference.
      </Text>
      <Text style={styles.text}>
        By registering for the Anonymous Chat app, you accept our{" "}
        <Text style={styles.link}>Terms of Use</Text> and{" "}
        <Text style={styles.link}>Privacy Policy</Text>.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileReadyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 24,
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: theme.COLORS.black,
    height: 50,
    width: "90%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
