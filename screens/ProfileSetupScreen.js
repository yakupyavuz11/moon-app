import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { COLORS } from "../constants/theme";

const ProfileSetupScreen = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [profileImage, setPhotoUrl] = useState("");

  const storage = getStorage(); // Firebase Storage
  const firestore = getFirestore(); // Firestore bağlantısı

  // Fotoğraf seç ve yükle
  const handlePhotoUpload = async () => {
    // Medya kütüphanesi izni kontrolü
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Fotoğraf seçmek için izin vermelisiniz!");
      return;
    }

    // Fotoğraf seçme işlemi
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaType.Images, // Yalnızca resimler
      allowsEditing: true, // Düzenlemeyi aç
      quality: 1, // Maksimum kalite
    });

    console.log(result); // Seçilen resmi kontrol et

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      const imageName = `profile_${Date.now()}.jpg`; // Benzersiz dosya adı oluştur
      const storageRef = ref(storage, `profilePictures/${imageName}`); // Firebase Storage referansı

      try {
        // Fotoğrafı Blob formatına dönüştürme
        const response = await fetch(imageUri);
        const blob = await response.blob();
        // Firebase'e yükleme
        await uploadBytes(storageRef, blob);

        // Yükleme tamamlandığında URL'yi al
        const downloadUrl = await getDownloadURL(storageRef);
        setPhotoUrl(downloadUrl); // URL'yi state'e kaydet
        alert("Fotoğraf başarıyla yüklendi!");
      } catch (error) {
        console.error("Fotoğraf yüklenirken bir hata oluştu:", error);
        alert("Fotoğraf yüklenirken bir hata oluştu.");
      }
    }
  };

  // Veriyi Firestore'a kaydet
  const handleSaveToFirestore = async () => {
    if (!username || !about || !profileImage) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }

    const data = {
      username: username,
      about: about,
      profileImage: profileImage,
    };

    try {
      const docRef = doc(firestore, "users", username); // Kullanıcı adını ID olarak kullanıyoruz
      await setDoc(docRef, data); // Firestore'a veri kaydetme
      alert("Veri başarıyla kaydedildi!");
    } catch (error) {
      console.error("Veri kaydedilirken hata oluştu:", error);
      alert("Veri kaydedilirken hata oluştu.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Oluştur</Text>

      {/* Fotoğraf Yükleme */}
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={handlePhotoUpload}>
          <View style={styles.avatar}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.placeholderText}>+</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>

      {/* Kullanıcı Adı */}
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı"
        value={username}
        onChangeText={setUsername}
      />

      {/* Hakkında */}
      <TextInput
        style={styles.aboutinput}
        placeholder="Hakkında"
        value={about}
        onChangeText={setAbout}
      />

      {/* Kaydet Butonu */}
      <TouchableOpacity style={styles.button} onPress={handleSaveToFirestore}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start", // Bu satırı değiştirdik
    backgroundColor: COLORS.primary,
  },
  title: { marginTop: 60, marginBottom: 32, color: "#fff", fontSize: 24, fontWeight: "bold" },
  avatarContainer: { marginBottom: 20 },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
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
    width: "90%",
  },
  aboutinput: {
    backgroundColor: "#f6f7f8",
    height: 100,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    width: "90%",
  },
  
  button: {
    backgroundColor: COLORS.black,
    height: 50,
    width: "90%",
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});

export default ProfileSetupScreen;
