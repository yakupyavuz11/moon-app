import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import "../i18n";
import { COLORS } from "@/constants/theme";

export default function Profile() {
  const navigation = useNavigation();
  const { t } = useTranslation();

  // Profil bilgilerini state'te tutuyoruz
  const [profile, setProfile] = useState({
    username: "mavigokyuzu221",
    about: "Software, Technology, Entrepreneurship Enthusiast.",
    profileImage: "https://images.pexels.com/photos/29748690/pexels-photo-29748690/free-photo-of-kendine-guvenen-gulumsemeyle-poz-veren-zarif-kadin.jpeg",
  });

  // Profil bilgilerini güncelleme fonksiyonu
  const updateProfile = (updatedProfile: { username: string; about: string; profileImage: string }) => {
    setProfile(updatedProfile);
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#6A5AE0" />

        {/* Settings Button */}
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => navigation.navigate("Settings")}
        >
          <Ionicons name="settings" size={30} color="#6A5AE0" />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: profile.profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>{profile.username}</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile", { profile, updateProfile })}
              style={styles.editButton}
            >
              <Ionicons name="pencil" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>{t('about')}</Text>
          <Text style={styles.aboutText}>{profile.about}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  settingsButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 2,
    borderColor: "#444",
  },
  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  name: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    width: 45,
    height: 45,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 15,
  },
  aboutSection: {
    marginTop: 30,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    color:COLORS.primary,
    fontSize: 16,
    lineHeight: 22,
  },
});