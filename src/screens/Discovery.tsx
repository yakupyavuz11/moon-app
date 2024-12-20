import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  View,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { Modalize } from "react-native-modalize";
import Product from "@/components/Product";
import users from "@/data/users";
import { useTranslation } from "react-i18next";
import "../i18n";
const numColumns = 2;
const screen_width = Dimensions.get("window").width;
const column_width = screen_width / numColumns;

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState(""); // Searchbar için state
  const [selectedAge, setSelectedAge] = useState("Tümü"); // Yaş seçimi
  const [selectedGender, setSelectedGender] = useState("Tümü"); // Cinsiyet seçimi
  const bottomSheetRef = useRef(null); // Filtreleme butonu için ref
  const genderSheetRef = useRef(null); // Cinsiyet seçim modalı için ref
  const t = useTranslation();
  const onOpenBottomSheet = () => {
    bottomSheetRef.current?.open();
  };

  const onOpenGenderSheet = () => {
    genderSheetRef.current?.open();
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    genderSheetRef.current?.close();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text
            style={{
              color: "#f7f7f7",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 24,
            }}
          >
            Discovery
          </Text>
        </View>
        <View style={styles.header}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            inputStyle={{
              minHeight: 0,
            }}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={onOpenBottomSheet}
          >
            <MaterialIcons name="filter-list" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* FlatList */}
        <FlatList
          data={users.filter((user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
          )}
          numColumns={numColumns}
          renderItem={({ item }) => (
            <Product
              image={item.image}
              name={item.name}
              price={item.status}
              column_width={column_width}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContent}
        />
      </SafeAreaView>

      {/* Filtre Modal */}
      <Modalize
        ref={bottomSheetRef}
        modalHeight={Dimensions.get("window").height * 0.5}
        modalStyle={styles.modal}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Filtrele</Text>

          {/* Yaş Seçimi */}
          <View style={styles.row}>
            <Text style={styles.label}>Yaş:</Text>
            <Text style={styles.value}>{selectedAge}</Text>
          </View>

          {/* Cinsiyet Seçimi */}
          <View style={styles.row}>
            <Text style={styles.label}>Cinsiyet:</Text>
            <TouchableOpacity
              style={styles.genderButton}
              onPress={onOpenGenderSheet}
            >
              <Text style={styles.value}>{selectedGender}</Text>
            </TouchableOpacity>
          </View>

          {/* Filtre Uygula Butonu */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Filtreyi Uygula</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      {/* Cinsiyet Modal */}
      <Modalize
        ref={genderSheetRef}
        modalHeight={Dimensions.get("window").height * 0.3}
        modalStyle={styles.modal}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Cinsiyet Seç</Text>
          <TouchableOpacity
            style={styles.genderButton}
            onPress={() => handleGenderSelect("Tümü")}
          >
            <Text style={styles.value}>Tümü</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderButton}
            onPress={() => handleGenderSelect("Erkek")}
          >
            <Text style={styles.value}>Erkek</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.genderButton}
            onPress={() => handleGenderSelect("Kadın")}
          >
            <Text style={styles.value}>Kadın</Text>
          </TouchableOpacity>
        </View>
      </Modalize>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "F7F7F7",
  },

  safeArea: {
    flex: 1,
    backgroundColor: "#f7f7f7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: -25,
    backgroundColor: "#6A5AE0",
    paddingVertical: 50,
    paddingHorizontal: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  searchbar: {
    marginTop: 5,
    height: "70%",
    flex: 1,
    marginRight: 10,
  },
  filterButton: {
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4A47A3",
    borderRadius: 5,
    padding: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#1C1C1E",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  label: {
    color: "#aaa",
    fontSize: 16,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  genderButton: {
    backgroundColor: "#444",
    color: "#fff",
    padding: 8,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  applyButton: {
    backgroundColor: "#7B61FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
