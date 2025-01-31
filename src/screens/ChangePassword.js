import { COLORS } from "@/constants/theme";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar
} from "react-native";
import { useNavigation } from "@react-navigation/native"; 
import { useTranslation } from "react-i18next"; 
import { Ionicons } from "@expo/vector-icons"; 

export default function ChangePassword() {
  const navigation = useNavigation(); 
  const { t } = useTranslation(); 

  return (
    <View style={styles.container}>
                  <StatusBar barStyle= "dark-content" backgroundColor={COLORS.primary} />
      
      {/* Üst Başlık */}
      <View style={styles.header}>
        {/* Back Arrow Icon */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.title}>{t("change_password_title")}</Text>
        <TouchableOpacity>
          <Text style={styles.saveText}>{t("save")}</Text>
        </TouchableOpacity>
      </View>

      {/* Form Alanı */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder={t("old_password_placeholder")}  
          placeholderTextColor="#888"
          secureTextEntry={true}

        />
        <TextInput
          style={styles.input}
          placeholder={t("new_password_placeholder")} 
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
