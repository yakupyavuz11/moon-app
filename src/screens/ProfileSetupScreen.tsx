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
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTranslation } from "react-i18next";
import "../i18n";

const ProfileSetupScreen = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { t } = useTranslation();
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to upload a photo."
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

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setBirthDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!username || !gender || !about) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const profileData = {
      username,
      password: "defaultPassword123", // Backend'inizin beklediği bir şifre eklemeniz gerekiyor.
      name: username, // İsim alanını username ile eşleştiriyoruz.
      email: `${username}@example.com`, // Örnek bir e-posta adresi oluşturuluyor.
      image: profileImage || "", // Eğer bir resim seçilmediyse boş gönderiyoruz.
    };

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        const responseData = await response.json();
        Alert.alert(
          "Success",
          `Your profile has been saved! ID: ${responseData.id}`
        );
        navigation.navigate("ProfileReady");
      } else {
        Alert.alert("Error", "Failed to register. Please try again.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while registering.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            placeholder={t("user_name")}
            style={styles.input}
            value={username}
            onChangeText={setUsername}
          />

          <Text style={styles.label}>{t("gender")}</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={t("select")} value="" />
            <Picker.Item label={t("male")} value="male" />
            <Picker.Item label={t("female")} value="female" />
            <Picker.Item label={t("other")} value="other" />
          </Picker>

          <Text style={styles.label}>{t("birth_date")}</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={styles.dateButton}
          >
            <Text style={styles.dateText}>
              {birthDate.toLocaleDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TextInput
            placeholder={t("about")}
            style={[styles.input, styles.textArea]}
            multiline
            numberOfLines={4}
            value={about}
            onChangeText={setAbout}
          />

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>{t("save")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    marginTop: 2,
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    marginTop: 50,
  },
  scrollView: {
    margin: 5,
    padding: 22,
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
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  picker: {
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  dateButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#000000",
    paddingVertical: 20,
    paddingHorizontal: 100,
    borderRadius: 80,
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3, // Adds shadow for Android
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ProfileSetupScreen;
