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

const Discovery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const navigation =
    useNavigation<StackNavigationProp<RootStackParamList, "Discovery">>();

  const numColumns = 2;
  const screen_width = Dimensions.get("window").width;
  const column_width = screen_width / numColumns;

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#6A5AE0" />
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
            <TouchableOpacity style={styles.filterButton}>
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
});

export default Discovery;
