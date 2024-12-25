import { COLORS } from "@/constants/theme";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Navigation Hook'u ekleniyor.
import { useTranslation } from "react-i18next"; // i18n Hook'u ekleniyor.

export default function ChangeEmail() {
  const navigation = useNavigation(); // Navigation Hook'u kullanılıyor.
  const { t } = useTranslation(); // i18n Hook'u kullanılıyor.

  return (
    <View style={styles.container}>
      {/* Üst Başlık */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{t("change_email_title")}</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>{t("save")}</Text>
        </TouchableOpacity>
      </View>

      {/* Form Alanı */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t("email_placeholder")} // Placeholder for email
          placeholderTextColor="#888"
        />
        <TextInput
          style={styles.input}
          placeholder={t("password_placeholder")} // Placeholder for password
          placeholderTextColor="#888"
          secureTextEntry={true}
        />
        <Text style={styles.infoText}>
          {t("change_email_info")} {/* Information text */}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  backText: {
    color: COLORS.white,
    fontSize: 18,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  saveText: {
    color: COLORS.white,
    fontSize: 16,
  },
  form: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#b4acf2",
    color: COLORS.white,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  infoText: {
    color: "#888",
    fontSize: 14,
  },
});
