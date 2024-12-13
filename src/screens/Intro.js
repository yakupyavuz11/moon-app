import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import images from "../constants/images";
import theme, { COLORS, FONTS, SIZES } from "../constants/theme";

const Intro = () => {
  const navigation = useNavigation(); // Access navigation here

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.primary }}>
      <StatusBar hidden />

      {/* Image Section */}
      <View
        style={{
          flex: 3,
          padding: 16,
          marginTop: 32,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={images.onboarding} style={styles.image} />
      </View>

      {/* Bottom Container for Buttons and Text */}
      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>Anonim olarak özgürce sohbet et</Text>
        <Button
          title="Başlayalım"
          onPress={() => navigation.navigate("Signup")} // Use navigation to go to Signup screen
          style={{ marginTop: 40, marginVertical: 8, width: SIZES.width - 64 }}
        />
        <Text style={styles.bottomSubtitle}>
          Giriş Yaptığında gizlilik sözleşmesini kabul etmiş olursunuz.
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Text style={{ color: COLORS.gray }}>Powered by {""}</Text>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>Yakup Yavuz</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 4,
    backgroundColor: COLORS.secondary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    padding: 16,
    bottom: -40,
  },

  bottomTitle: {
    marginTop: 40,
    color: COLORS.white,
    fontSize: 32,
    margin: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  bottomSubtitle: {
    marginTop: 30,
    color: COLORS.gray,
    fontSize: theme.SIZES.font * 1.1,
    fontWeight: "400",
    textAlign: "left",
    marginBottom: 8,
  },

  image: {
    width: SIZES.width - 64,
    height: 250,
    resizeMode: "contain",
  },
});
