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
import { Ionicons } from "@expo/vector-icons"; 

export default function ChangeEmail() {
  const navigation = useNavigation(); // Navigation Hook'u kullanılıyor.
  const { t } = useTranslation(); // i18n Hook'u kullanılıyor.

  return (
    <View style={styles.container}>
      {/* Üst Başlık */}
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
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
    marginTop:40,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
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
    backgroundColor: "#f0f0f0",
    color: COLORS.black,
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
});
