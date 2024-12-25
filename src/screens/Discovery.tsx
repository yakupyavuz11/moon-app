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
const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Discovery">>(); // `useNavigation` hook'unu component içerisinde kullan

  const numColumns = 2;
  const screen_width = Dimensions.get("window").width;
  const column_width = screen_width / numColumns;

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
            {t("discovery")}
          </Text>
        </View>
        <View style={styles.header}>
          <Searchbar
            placeholder={t("search")} // "Search" metni JSON'dan alınır
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchbar}
            inputStyle={{
              minHeight: 0,
            }}
          />
          <TouchableOpacity style={styles.filterButton}>
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
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("UserProfile", { userId: item.id })
              } // Doğru kullanım
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

      <StatusBar style="light" />
    </View>
  );
};

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
});

export default Discovery;
