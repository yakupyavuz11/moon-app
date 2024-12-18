import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import theme from "../constants/theme";
import useStore from "@/store/useStore";
import { API } from "@/http";
import "../i18n";
import { useTranslation } from "react-i18next";

export default function Login({ navigation }) {
  const [email, setEmail] = useState(""); // E-posta state'i
  const [password, setPassword] = useState(""); // Şifre state'i
  const { login } = useStore();
  const { t } = useTranslation();

  // Giriş Yap  butonuna basıldığında çalışan fonksiyon
  const onHandleLogin = async() => {
    if (email !== "" && password !== "") {

      login();
    } else {
      Alert.alert("Hata", "E-posta ve şifre boş bırakılamaz");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder={t("email")}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder={t("password")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={() => navigation.navigate("Forget")}>
        <Text style={styles.ForgetPassword}>{t("forgot_password_title")} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{ color: "#fff", fontSize: 18 }}>{t("login_button")}</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>{t("dont_have_an_account")} </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}>{t("signup_title")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: theme.COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#FFFFFF",
  },
  input: {
    backgroundColor: "#f6f7f8",
    height: 50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.COLORS.black,
    height: 50,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  signupText: {
    color: "#fff",
    fontSize: 16,
  },
  signupLink: {
    textDecorationLine: "underline",
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  ForgetPassword: {
    color: "#fff",
    fontSize: 12,
    textAlign: "right",
    marginBottom: 10,
  },
});
