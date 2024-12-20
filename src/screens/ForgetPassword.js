import { COLORS } from "@/constants/theme";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ForgetPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handleSubmit = () => {
    if (!email) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Email validation and password reset process can be added here.
    Alert.alert(
      "Success",
      "A password reset link has been sent to your email address."
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Forgot Your Password?</Text>
      <Text style={styles.subtitle}>
        Enter your email address, and we’ll send you a link to reset your
        password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email address"
        placeholderTextColor={COLORS.black} 
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: COLORS.white,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: COLORS.white,
  },
  input: {
    backgroundColor:COLORS.white,
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: COLORS.black,
    borderRadius: 100,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  backButton: {
    marginTop: 5,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
  },
});

export default ForgetPasswordScreen;
