import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import Product from "@/components/Product";
import users from "@/data/users";
import { useTranslation } from "react-i18next";
import "../i18n";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { COLORS } from "@/constants/theme";
import Modal from "react-native-modal";
import { Picker } from "@react-native-picker/picker";

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedAgeRange, setSelectedAgeRange] = useState("18-25");
  const [selectedGender, setSelectedGender] = useState("Male");
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Discovery">>();

  const numColumns = 2;
  const screen_width = Dimensions.get("window").width;
  const column_width = screen_width / numColumns;

  // Modal'ı açıp kapatma fonksiyonu
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* Set the StatusBar with black background and white icons */}
      <StatusBar style="light" backgroundColor="black" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>{t("discovery")}</Text>
          <View style={styles.searchContainer}>
            <Searchbar
              placeholder={t("search")}
              onChangeText={setSearchQuery}
              value={searchQuery}
              style={styles.searchbar}
              inputStyle={{ minHeight: 0 }}
            />
            <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
              <MaterialIcons name="filter-list" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* FlatList */}
        <FlatList
          data={users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", { userId: item.id })
              }
            >
              <Product
                image={item.image}
                name={item.name}
                price={item.status}
                column_width={column_width}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </SafeAreaView>

      {/* Bottom Sheet Modal for Filters */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
        swipeDirection="down"  // Modal'ın aşağıya kaymasına izin ver
        backdropOpacity={0.5} // Modal dışı alanın opaklığını azalt
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{t("filter")}</Text>

          {/* Age Range Picker */}
          <Text style={styles.modalLabel}>{t("age")}</Text>
          <Picker
            selectedValue={selectedAgeRange}
            onValueChange={(itemValue) => setSelectedAgeRange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="18-25" value="18-25" />
            <Picker.Item label="26-35" value="26-35" />
            <Picker.Item label="36-45" value="36-45" />
            <Picker.Item label="46+" value="46+" />
          </Picker>

          {/* Gender Picker */}
          <Text style={styles.modalLabel}>{t("gender")}</Text>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label={t("male")} value="Male" />
            <Picker.Item label={t("female")} value="Female" />
            <Picker.Item label={t("other")} value="Other" />
          </Picker>

          {/* Apply Filter Button */}
          <TouchableOpacity style={styles.applyButton} onPress={toggleModal}>
            <Text style={styles.applyButtonText}>{t("save")}</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: Platform.OS === "ios" ? 60 : 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "flex-start",
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  searchbar: {
    flex: 1,
    marginRight: 10,
    height: 50,
    borderRadius: 10,
  },
  filterButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A47A3",
    borderRadius: 10,
    padding: 12,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end", // Modal'ı ekranın alt kısmına yerleştir
    margin: 0,
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: "100%",
    maxHeight: "70%", // Modal'ın yüksekliği %70 olacak
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalLabel: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  applyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignSelf: "center", // Butonu ortala
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Discovery;
