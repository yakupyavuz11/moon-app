import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { COLORS } from "../constants/theme";

const ProfileSetupScreen = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const firestore = getFirestore(); // Firestore connection

  // Photo upload handler
  const handlePhotoUpload = async () => {
    setIsLoading(true);

    try {
      // Request media library permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission Required", "You need to grant photo library access.");
        setIsLoading(false);
        return;
      }

      // Pick a photo
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const base64Image = await uriToBase64(imageUri);
        setPhotoUrl(base64Image);
        Alert.alert("Success", "Photo uploaded successfully!");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      Alert.alert("Error", "An error occurred while selecting the photo.");
    }

    setIsLoading(false);
  };

  // Convert URI to Base64 format
  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]); // Return Base64 string
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // Save data to Firestore
  const handleSaveToFirestore = async () => {
    if (!username || !about || !profileImage) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    // Check if the username already exists
    const userDocRef = doc(firestore, "users", username);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      Alert.alert("Username Taken", "This username is already taken.");
      setIsLoading(false);
      return;
    }

    const data = {
      username: username,
      about: about,
      profileImage: profileImage, // Base64 image data
    };

    try {
      await setDoc(userDocRef, data); // Save data to Firestore
      Alert.alert("Success", "Profile saved successfully!");
    } catch (error) {
      console.error("Error occurred while saving data:", error);
      Alert.alert("Error", "An error occurred while saving the data.");
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Create Profile</Text>

      {/* Photo Upload */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handlePhotoUpload} disabled={isLoading}>
          <View style={styles.avatar}>
            {profileImage ? (
              <Image
                source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.placeholderText}>+ Select Image</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      {/* About Input */}
      <TextInput
        style={styles.aboutinput}
        placeholder="About"
        value={about}
        onChangeText={setAbout}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity
        style={[styles.button, isLoading && styles.loadingState]}
        onPress={handleSaveToFirestore}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Saving..." : "Save"}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: COLORS.primary,
    padding: 20,
  },
  title: {
    marginTop: 60,
    marginBottom: 32,
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  avatarContainer: { marginBottom: 20 },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loadingState: {
    opacity: 0.5, // Add transparency to show loading state
  },
  avatarImage: { width: 100, height: 100, borderRadius: 50 },
  placeholderText: { fontSize: 36, color: "#fff" },
  input: {
    backgroundColor: "#f6f7f8",
    height: 50,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: "100%",
  },
  aboutinput: {
    backgroundColor: "#f6f7f8",
    height: 100,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: "100%",
  },
  button: {
    backgroundColor: COLORS.black,
    height: 50,
    width: "100%",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default ProfileSetupScreen;
