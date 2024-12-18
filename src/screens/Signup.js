import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import theme, { COLORS } from "../constants/theme";
import { Button } from "react-native-paper";
import "../i18n";
export default function Signup({ navigation }) {
  const [email, setEmail] = useState(""); // E-posta state'i
  const [password, setPassword] = useState(""); // Şifre state'i
  const [username, setUsername] = useState(""); // Kullanıcı adı state'i
  const { t } = useTranslation();
  const onHandleSignup = async () => {
    if (email !== "" && password !== "" && username !== "" && name !== "") {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: name,
              email: email,
              username: username,
              password: password,
              image: "",
            }),
          }
        );

        if (response.ok) {
          const result = await response.json();
          console.log("Kayıt Başarılı:", result);
          Alert.alert("Başarılı", "Hesabınız başarıyla oluşturuldu!");
          navigation.navigate("ProfileSetup"); // Sonraki ekran
        } else {
          const errorMessage = await response.text();
          console.log("Kayıt Hatası:", errorMessage);
          Alert.alert("Hata", errorMessage || "Bir şeyler yanlış gitti.");
        }
      } catch (error) {
        console.error("Request Error:", error);
        Alert.alert("Hata", "Sunucuya bağlanılamadı. Lütfen tekrar deneyin.");
      }
    } else {
      Alert.alert("Hata", "Tüm alanları doldurmanız gerekiyor.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> {t("signup_title")}</Text>
      <TextInput
        style={styles.input}
        placeholder={t("user_name")}
        value={username}
        onChangeText={setUsername}
      />
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
      <Button style={styles.button} onPress={onHandleSignup}>
        <Text style={{ color: COLORS.white, fontSize: 18 }}>
          {" "}
          {t("sign_up")}
        </Text>
      </Button>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>{t("already_have_account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupLink}>{t(login_title)}</Text>
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
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
