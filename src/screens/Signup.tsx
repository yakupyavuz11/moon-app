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
import { useTranslation } from "react-i18next"; // i18next'i import et
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("test@gmail.com"); // E-posta state'i
  const [password, setPassword] = useState("test123"); // Şifre state'i
  const [username, setUsername] = useState("test"); // Kullanıcı adı state'i
  const { t } = useTranslation();
  const onHandleSignup = async () => {
    if (email !== "" && password !== "" && username !== "") {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username, // Kullanıcı adı name olarak kullanılıyor
            email,
            username,
            password,
            image:
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // Varsayılan boş bırakılmış
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Kayıt Başarılı:", result);
          Alert.alert("Başarılı", "Hesabınız başarıyla oluşturuldu!");
          navigation.navigate("ProfileSetup"); // Bir sonraki ekrana yönlendirme
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
    <SafeAreaView style={styles.container}>
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
          {t("signup_button")}
        </Text>
      </Button>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>{t("already_have_account")}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupLink}>{t("login_title")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: theme.COLORS.primary,

  },
  title: {
    marginTop: 100,
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
