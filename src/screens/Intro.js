import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Button from "../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next"; // i18next'i import et
import images from "../constants/images";
import theme, { COLORS, FONTS, SIZES } from "../constants/theme";
import "../i18n"; // i18n.js dosyasını import et

const Intro = () => {
  const navigation = useNavigation(); // Navigation'ı kullan
  const { t } = useTranslation(); // useTranslation hook'u ile t fonksiyonunu al

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.COLORS.white }}>
      <StatusBar hidden />

      {/* Görsel Bölümü */}
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

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>
          {t("intro_title")} {/* Çeviriyi buradan çağır */}
        </Text>
        <Button
          title={t("start_button")}
          onPress={() => navigation.navigate("Signup")}
          style={{
            backgroundColor: COLORS.black,
            marginTop: 40,
            marginVertical: 8,
            width: SIZES.width - 64,
          }}
        />
        <Text style={styles.bottomSubtitle}>
          {t("privacy_disclaimer")}
        </Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 16 }}
        >
          <Text style={{ ...FONTS.h4, color: COLORS.gray }}>
            {t  ("powered_by") } 
          </Text>
          <Text style={{ ...FONTS.h3, color: COLORS.white }}>
            {" Moon LLC"}{" "}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Intro;

const styles = StyleSheet.create({
  bottomContainer: {
    flex: 4,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    padding: 16,
    bottom: -40,
  },

  bottomTitle: {
    marginTop: 40,
    color: COLORS.white,
    fontSize: 24,
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
