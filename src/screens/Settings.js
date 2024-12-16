import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
const Settings = () => {
  const deleteAlert = () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  const freezemyaccount = () => {
    Alert.alert(
      "Freeze Account",
      "Are you sure you want to freeze your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  const navigation = useNavigation(); // Hook, komponentin içinde tanımlandı.
  const [lastSeen, setLastSeen] = useState(true);
  const [discoveryVisibility, setDiscoveryVisibility] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [notifications, setNotifications] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name="arrow-back"
          size={24}
          color="white"
        />
        <Text style={styles.headerTitle}>Settings</Text>
        <Ionicons name="moon" size={24} color="white" />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Last Seen</Text>
          <Switch
            value={lastSeen}
            onValueChange={() => setLastSeen(!lastSeen)}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Show My Profile in Discovery</Text>
          <Switch
            value={discoveryVisibility}
            onValueChange={() => setDiscoveryVisibility(!discoveryVisibility)}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Read Receipts</Text>
          <Switch
            value={readReceipts}
            onValueChange={() => setReadReceipts(!readReceipts)}
          />
        </View>
        <View style={styles.settingItem}>
          <Text style={styles.text}>Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={() => setNotifications(!notifications)}
          />
        </View>

        {/* Static Options */}
        <TouchableOpacity
          onPress={() => navigation.navigate("Language")}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Language</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ChangePassword")}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Change Password</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeEmail")}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Change Email</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteAlert()}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Delete Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => freezemyaccount()}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Freeze Account</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ChangeEmail")}
          style={styles.settingItem}
        >
          <Text style={styles.text}>Help</Text>
          <Ionicons name="chevron-forward" size={20} color="#888" />
        </TouchableOpacity>
        {/* Logout */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
          <Text style={styles.version}>Version: 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.white },
  header: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: COLORS.primary,
  },
  headerTitle: { fontSize: 20, color: "#FFF", fontWeight: "bold" },
  content: { padding: 10 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  text: { color: COLORS.black, fontSize: 16 },
  footer: { marginTop: 20, alignItems: "center" },
  footerButton: {
    width: 150,
    marginVertical: 20,
    backgroundColor: COLORS.primary,
    padding: 10,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: { color: COLORS.white, fontSize: 16 },
  version: { color: "#777", fontSize: 14 },
});

export default Settings;
