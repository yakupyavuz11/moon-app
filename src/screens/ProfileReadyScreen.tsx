import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import theme, { COLORS } from "../constants/theme";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import "../i18n";
const ProfileReadyScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();

  console.info(navigation.getState());

  const handleAccept = () => {
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Before the Chat</Text>
      <Text style={styles.text}>{t("welcome_text")}</Text>
      <Text style={styles.text}>{t("welcome_text_2")}</Text>
      <Text style={styles.text}>
        {t("welcome_text_3")}
        <Text style={styles.link}>{t("terms_and_conditions")}</Text> and{" "}
        <Text style={styles.link}>{t("privacy_policy")}</Text>.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.buttonText}>{t("accept")}</Text>
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
