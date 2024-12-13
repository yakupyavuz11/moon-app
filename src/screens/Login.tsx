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

export default function Login({ navigation }) {
  const [email, setEmail] = useState(""); // E-posta state'i
  const [password, setPassword] = useState(""); // Şifre state'i
  const { login } = useStore();

  // Giriş Yap butonuna basıldığında çalışan fonksiyon
  const onHandleLogin = async () => {
    if (email !== "" && password !== "") {
      const loginData = {
        email: email,
        password: password,
      };

      try {
        const response = await fetch("http://185.95.164.220:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        const result = await response.json();

        if (response.ok) {
          console.log("Login successful");
          login(result.user); 
          navigation.navigate("Profile"); 
        } else {
          throw new Error(result.message || "Giriş yaparken bir hata oluştu.");
        }
      } catch (error) {
        console.error(error);
        Alert.alert("Hata", error.message);
      }
    } else {
      Alert.alert("Hata", "E-posta ve şifre boş bırakılamaz");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>
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
      <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
        <Text style={{ color: "#fff", fontSize: 18 }}>Giriş Yap</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={styles.signupText}>Zaten hesabınız var mı? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupLink}>Kayıt Ol</Text>
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
