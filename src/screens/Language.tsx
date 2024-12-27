import { StyleSheet, Text, View, Alert, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons"; // Vector Icon için
import { useTranslation } from "react-i18next"; // Import i18next hook for translations

const Language = ({ navigation }) => {
  const { t, i18n } = useTranslation(); // Use translation hook and i18n instance
  const [language, setLanguage] = useState("tr");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang.toLowerCase()); 
    Alert.alert(`${lang} seçildi`); 
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('language')}</Text> {/* Dynamic title */}
      </View>

      {/* Dil Seçimi Ekranı */}
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold" }}>{t('language')}</Text> {/* Dynamic text */}
        <Text style={{ marginBottom: 10 }}>{t('select_language')}</Text> {/* Dynamic text */}
        <Text style={{ marginBottom: 20 }}>{t('current_language')} {language}</Text>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("tr")}>
              <Image
                source={require("../assets/images/turkey.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("en")}>
              <Image
                source={require("../assets/images/amerika.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("fr")}>
              <Image
                source={require("../assets/images/fransa.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("esp")}>
              <Image
                source={require("../assets/images/ispanya.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("ar")}>
              <Image
                source={require("../assets/images/arabistan.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("hi")}>
              <Image
                source={require("../assets/images/hindistan.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("zh")}>
              <Image
                source={require("../assets/images/cin.png")}
                style={styles.flag}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableOpacity onPress={() => handleLanguageChange("de")}>
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
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "center",
    alignItems: "center", 
    width: "80%",
  },
  buttonWrapper: {
    margin: 10, 
    alignItems: "center", 
  },
  flag: {
    width: 60,
    height: 35,
    marginBottom: 5,
  },
});
