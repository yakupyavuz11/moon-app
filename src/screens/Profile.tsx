import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import { useNavigation } from "@react-navigation/native"; // useNavigation hook'u
import theme, {COLORS} from "../constants/theme";
export default function Account() {
  const navigation = useNavigation(); // Hook'u kullanıyoruz

  return (
    <ScrollView style={styles.container}>
      {/* Settings Button */}
      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => navigation.navigate("Settings")} // Ayar sayfasına git
      >
        <Ionicons name="settings" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Profil İçeriği */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: "https://images.pexels.com/photos/29748690/pexels-photo-29748690/free-photo-of-kendine-guvenen-gulumsemeyle-poz-veren-zarif-kadin.jpeg",
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfoContainer}>
          <Text style={styles.name}>mavigokyuzu221</Text>
        </View>
      </View>

      <View style={styles.aboutSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.aboutText}>Software, Technology, Entrepreneurship Enthusiast.</Text>
      </View>

      <TouchableOpacity style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Share Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.linkButton}>
        <Text onPress={() => navigation.navigate("EditProfile")} style={styles.linkButtonText}> Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 400,
    height: 300,
    borderWidth: 2,
    borderColor: COLORS.black,
  },
  name: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  aboutSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  aboutText: {
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 22,
  },
  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  linkButton: {
    width: 200,
    height: 50,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginLeft: 100,
    backgroundColor: COLORS.primary,
  },
  linkButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
