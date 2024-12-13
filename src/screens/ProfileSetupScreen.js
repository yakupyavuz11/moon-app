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
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { COLORS } from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

const ProfileSetupScreen = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setPhotoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const firestore = getFirestore();
  const navigation = useNavigation();

  const handlePhotoUpload = async () => {
    setIsLoading(true);

    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("İzin Gerekli", "Fotoğraf kütüphanesine erişim izni vermelisiniz.");
        setIsLoading(false);
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        const base64Image = await uriToBase64(imageUri);
        setPhotoUrl(base64Image);
        Alert.alert("Başarılı", "Fotoğraf başarıyla yüklendi!");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      Alert.alert("Hata", "Fotoğraf seçilirken bir hata oluştu.");
    }

    setIsLoading(false);
  };

  const uriToBase64 = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleSaveToFirestore = async () => {
    if (!username || !about || !profileImage) {
      Alert.alert("Doğrulama Hatası", "Lütfen tüm alanları doldurun.");
      return;
    }

    setIsLoading(true);

    const userDocRef = doc(firestore, "users", username);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      Alert.alert("Kullanıcı Adı Alındı", "Bu kullanıcı adı zaten alınmış.");
      setIsLoading(false);
      return;
    }

    const data = {
      username: username,
      about: about,
      profileImage: profileImage,
    };

    try {
      await setDoc(userDocRef, data);
      Alert.alert("Başarılı", "Profil başarıyla kaydedildi!");
      navigation.replace("ProfileReady"); // `replace` kullanarak mevcut ekranı değiştirebilirsiniz
    } catch (error) {
      console.error("Veri kaydedilirken hata oluştu:", error);
      Alert.alert("Hata", "Veri kaydedilirken bir hata oluştu.");
    }

    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Profil Oluştur</Text>

        <SafeAreaView>
          {/* Fotoğraf Yükleme */}
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handlePhotoUpload} disabled={isLoading}>
              <View style={styles.avatar}>
                {profileImage ? (
                  <Image
                    source={{ uri: `data:image/jpeg;base64,${profileImage}` }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.placeholderText}>+ Resim Seç</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>

          {/* Kullanıcı Adı Girişi */}
          <TextInput
            style={styles.input}
            placeholder="Kullanıcı Adı"
            value={username}
            onChangeText={setUsername}
          />

          {/* Hakkında Girişi */}
          <TextInput
            style={styles.aboutinput}
            placeholder="Hakkında"
            value={about}
            onChangeText={setAbout}
            multiline
          />

          {/* Kaydet Butonu */}
          <TouchableOpacity
            style={[styles.button, isLoading && styles.loadingState]}
            onPress={handleSaveToFirestore}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Kaydediliyor..." : "Kaydet"}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
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
  scrollContainer: {
    paddingBottom: 20,
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
    opacity: 0.5,
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
