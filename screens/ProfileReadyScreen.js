import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigasyonu ekliyoruz.
import theme, { COLORS } from "../constants/theme";

const ProfileReadyScreen = () => {
  const navigation = useNavigation(); // useNavigation hook'u ile navigasyon erişimi.

  const handleAccept = () => {
    navigation.replace("BottomTabNavigator"); // Navigasyon işlemine yönlendirme.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sohbetten Önce</Text>
      <Text style={styles.text}>
        Hoşgeldin! Her ne kadar anonim olsanda kullanıcılarımıza gönderdiğin
        mesajlardan sorumlu olduğunu hatırlatmak isteriz.
      </Text>
      <Text style={styles.text}>
        Burada ırk, milliyet, etnik köken, cinsiyet, cinsiyet kimliği veya
        cinsel tercihi ne olursa olsun herkesle nezaket ve saygıyla sohbet
        etmelisin.
      </Text>
      <Text style={styles.text}>
        Anonim Chat uygulamasına kayıt olduğunda{" "}
        <Text style={styles.link}>Kullanım Şartlarımızı</Text> ve{" "}
        <Text style={styles.link}>Gizlilik Politikamızı</Text> kabul etmiş
        olursun.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleAccept}>
        <Text style={styles.buttonText}>Kabul Et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileReadyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: COLORS.white,
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 24,
  },
  link: {
    color: "#000",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: theme.COLORS.black,
    height: 50,
    width: "90%",
    marginBottom: 20,
    padding: 10,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
