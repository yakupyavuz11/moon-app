import React from "react";
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
import theme, { COLORS } from "../constants/theme";
import { StatusBar } from "expo-status-bar";

export default function Account() {
  const navigation = useNavigation(); // Hook'u kullanıyoruz

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
            source={{
              uri: "https://images.pexels.com/photos/29748690/pexels-photo-29748690/free-photo-of-kendine-guvenen-gulumsemeyle-poz-veren-zarif-kadin.jpeg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>mavigokyuzu221</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.editButton}
            >
              <Ionicons name="pencil" size={25} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Software, Technology, Entrepreneurship Enthusiast.
          </Text>
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
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 22,
  },
});
