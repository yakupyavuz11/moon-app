import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; // Vector Icon için

const Language = ({ navigation }) => {
  const [language, setLanguage] = useState("Türkçe");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    Alert.alert(`${lang} seçildi`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dil Seçimi</Text>
      </View>

      {/* Dil Seçimi Ekranı */}
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>Dil Seçimi</Text>
        <Text style={{ marginBottom: 10 }}>
          Seçtiğiniz dili başarıyla değiştirin.
        </Text>
        <Text style={{ marginBottom: 20 }}>Şu anki dil: {language}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("Türkçe")}>
              <Image
                source={require("../assets/images/turkey.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("English")}>
              <Image
                source={require("../assets/images/amerika.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("Français")}>
              <Image
                source={require("../assets/images/fransa.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("Español")}>
              <Image
                source={require("../assets/images/ispanya.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("العربية")}>
              <Image
                source={require("../assets/images/arabistan.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("Hindi")}>
              <Image
                source={require("../assets/images/hindistan.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("中文")}>
              <Image
                source={require("../assets/images/cin.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("Deutsch")}>
              <Image
                source={require("../assets/images/almanya.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Language;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#6A5AE0",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  buttonContainer: {
    flexDirection: "row", // Yatay düzen
    flexWrap: "wrap", // Ekranı taşan öğeleri bir alt satıra yerleştirir
    justifyContent: "center", // Yatayda ortalar
    alignItems: "center", // Dikeyde ortalar
    width: "80%", // Konteyner genişliği
  },
  buttonWrapper: {
    margin: 10, // Butonların etrafındaki boşluk
    alignItems: "center", // Metni ve görselleri ortalar
  },
  flag: {
    width: 60,
    height: 35,
    marginBottom: 5,
  },
});
