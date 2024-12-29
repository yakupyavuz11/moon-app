import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useNavigation } from "@react-navigation/native";
import useStore from "@/store/useStore";
import { useTranslation } from "react-i18next"; // Removed import of t from props
import "../i18n";

const { width, height } = Dimensions.get("window");

const Settings = () => {
  const { logout } = useStore();
  const { t } = useTranslation(); // Correctly use useTranslation hook

  const deleteAlert = () => {
    Alert.alert(
      t("delete_account_alert_title"), // Dynamically use text from JSON
      t("delete_account_alert_message"),
      [
        {
          text: t("delete_account_alert_cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: t("delete_account_alert_ok"),
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  const freezemyaccount = () => {
    Alert.alert(
      t("freeze_account_alert_title"),
      t("freeze_account_alert_message"),
      [
        {
          text: t("freeze_account_alert_cancel"),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: t("freeze_account_alert_ok"),
          onPress: () => console.log("OK Pressed"),
        },
      ]
    );
  };

  const logoutHandler = async () => {
    try {
      logout();
      return;
      const response = await fetch("http://localhost:3000/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(t("success_title"), t("success_message"));
        navigation.navigate("Login");
      } else {
        Alert.alert(t("error_title"), data.message || t("error_message"));
      }
    } catch (error) {
      console.error(error);
      Alert.alert(t("error_title"), t("error_message"));
    }
  };

  const navigation = useNavigation();
  const [lastSeen, setLastSeen] = useState(true);
  const [discoveryVisibility, setDiscoveryVisibility] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back"
            size={24}
            color="white"
          />
          <Text style={styles.headerTitle}>{t("settings_title")}</Text>
          <Ionicons name="moon" size={24} color="white" />
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.settingItem}>
            <Text style={styles.text}>{t("last_seen")}</Text>
            <Switch
              value={lastSeen}
              onValueChange={() => setLastSeen(!lastSeen)}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.text}>{t("show_profile_in_discovery")}</Text>
            <Switch
              value={discoveryVisibility}
              onValueChange={() => setDiscoveryVisibility(!discoveryVisibility)}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.text}>{t("read_receipts")}</Text>
            <Switch
              value={readReceipts}
              onValueChange={() => setReadReceipts(!readReceipts)}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.text}>{t("notifications")}</Text>
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
            <Text style={styles.text}>{t("language")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
            style={styles.settingItem}
          >
            <Text style={styles.text}>{t("change_password")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangeEmail")}
            style={styles.settingItem}
          >
            <Text style={styles.text}>{t("change_email")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteAlert()}
            style={styles.settingItem}
          >
            <Text style={styles.text}>{t("delete_account")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => freezemyaccount()}
            style={styles.settingItem}
          >
            <Text style={styles.text}>{t("freeze_account")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("ChangeEmail")}
            style={styles.settingItem}
          >
            <Text style={styles.text}>{t("help")}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>

          {/* Logout */}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={logoutHandler}
              style={styles.footerButton}
            >
              <Text style={styles.logoutText}>{t("logout")}</Text>
            </TouchableOpacity>
            <Text style={styles.version}>{t("version")}</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: width * 0.05,
  },
  headerTitle: {
    fontSize: width * 0.05,
    color: "#FFF",
    fontWeight: "bold",
  },
  content: {
    padding: width * 0.05,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  text: {
    color: COLORS.black,
    fontSize: width * 0.04,
  },
  footer: {
    marginTop: height * 0.05,
    alignItems: "center",
  },
  footerButton: {
    marginTop: -30,
    width: width * 0.4,
    marginVertical: height * 0.02,
    backgroundColor: COLORS.primary,
    padding: height * 0.015,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: COLORS.white,
    fontSize: 14  ,
  },
  version: {
    color: "#777",
    fontSize: width * 0.04,
  },
});

export default Settings;
