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

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const onHandleSignup = () => {
    if (email !== "" && password !== "") {
      fetch("http://185.95.164.220:3000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            console.log("Kayıt Başarılı");
            Alert.alert("Başarılı", "Hesabınız başarıyla oluşturuldu!");
            navigation.navigate("ProfileSetup"); // KAYIT SONRASI YONLENDIRME
          } else {
            Alert.alert("Kayıt Hatası", data.message || "Bir hata oluştu.");
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert("Kayıt Hatası", "Bir hata oluştu. Lütfen tekrar deneyin.");
        });
    } else {
      Alert.alert("Hata", "E-posta ve şifre boş bırakılamaz");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>
      <TextInput
        style={styles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{ color: "#fff", fontSize: 18 }}> Kayıt Ol</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>Zaten hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupLink}>Giriş Yap</Text>
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
    fontWeight: "500",
    fontSize: 16,
  },
});
