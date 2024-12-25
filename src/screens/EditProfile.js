import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; 
import { useTranslation } from "react-i18next"; 

const EditProfile = () => {
  const { t } = useTranslation(); 
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");

  const navigation = useNavigation();

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        t("permission_denied_title"),
        t("permission_denied_message")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!username || !about) {
      Alert.alert(t("error_title"), t("error_message"));
    } else {
      Alert.alert(t("success_title"), t("success_message"));
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("edit_profile_title")}</Text>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <TouchableOpacity onPress={pickImage}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imageText}>{t("upload_photo")}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TextInput
            placeholder={t("username_placeholder")}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <TextInput
            placeholder={t("about_placeholder")}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={about}
            onChangeText={setAbout}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t("save_button_text")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.primary,
  },
  headerTitle: {
    fontSize: 20,
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 10,
  },
  scrollView: {
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#4CAF50",
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "#6A5AE0",
  },
  imageText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6A5AE0",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
  button: {
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 80,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default EditProfile;
