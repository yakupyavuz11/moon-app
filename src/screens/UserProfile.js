import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme"; // Replace with your color constants
import "../i18n";
import { useTranslation } from "react-i18next";

const UserProfile = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  
  const [isMenuVisible, setMenuVisible] = useState(false);

  const imageUrl =
    "https://images.pexels.com/photos/29958104/pexels-photo-29958104/free-photo-of-kahverengi-deri-ceketli-kizil-sacli-zarif-kadin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const handleBlockUser = () => {
    setMenuVisible(false);  // Close the menu
    alert("User Blocked");
  };

  const handleReportUser = () => {
    setMenuVisible(false);  // Close the menu
    alert("User Reported");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* Status Bar */}
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

        {/* Back Arrow Icon */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={30} color={COLORS.black} />
        </TouchableOpacity>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          {/* Profile Image */}
          <Image source={{ uri: imageUrl }} style={styles.profileImage} />
          <Text style={styles.profileName}>alfredosalis</Text>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>{t("about")}</Text>
          <Text style={styles.aboutText}>
            A passionate Fashion Designer with a love for travel and technology.
            Always seeking to explore new challenges and build innovative
            designs that make a difference. Enjoys collaborating on creative
            projects and staying ahead of tech trends.
          </Text>
        </View>

        {/* Spacer to push button to the bottom */}
        <View style={styles.bottomSpacer}></View>
      </ScrollView>

      {/* Top-right Menu Button (Three Dots) */}
      <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuVisible(true)}
      >
        <Ionicons name="ellipsis-vertical" size={30} color={COLORS.black} />
      </TouchableOpacity>

      {/* Menu Modal */}
      <Modal
        visible={isMenuVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.menuContainer}>
              <TouchableOpacity style={styles.menuItem} onPress={handleBlockUser}>
                <Text style={styles.menuText}>🚫Block</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem} onPress={handleReportUser}>
                <Text style={styles.menuText}>📛 Report</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContent: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 100,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20, 
    zIndex: 1,
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: COLORS.primary,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.blackD,
    marginTop: 10,
  },
  aboutSection: {
    width: "90%",
    marginVertical: 30,
    paddingHorizontal: 20,
    alignItems: "flex-start",
  },
  aboutTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: COLORS.black,
    textAlign: "left",
    lineHeight: 24,
  },
  bottomSpacer: {
    flex: 1,
  },
  menuButton: {
    position: "absolute",
    top: 40, // Keep at the top to align with back button
    right: 20, // Right aligned for menu button
    zIndex: 1,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  menuContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    width: 200,
    padding: 15,
    elevation: 5,
  },
  menuItem: {
    paddingVertical: 10,
    alignItems: "flex-start",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.black,
  },
});

export default UserProfile;
