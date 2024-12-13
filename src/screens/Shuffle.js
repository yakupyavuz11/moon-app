import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Searchbar } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet"; // Bottom sheet importu
import { MaterialIcons } from "@expo/vector-icons"; // Filter ikonu için

const users = [
  {
    id: "1",
    name: "Yakup",
    status: "Selam kaptan!",
    image:
      "https://images.pexels.com/photos/7421636/pexels-photo-7421636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    name: "Osman",
    status: "20 yaş İstanbul.",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    name: "Ayşe",
    status: "Hayat güzel!",
    image:
      "https://images.pexels.com/photos/1108092/pexels-photo-1108092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    name: "Mehmet",
    status: "Her şey yolunda.",
    image:
      "https://images.pexels.com/photos/1190980/pexels-photo-1190980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    name: "Fatma",
    status: "İstanbul'da bir hayat.",
    image:
      "https://images.pexels.com/photos/1190980/pexels-photo-1190980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "6",
    name: "Hakan",
    status: "Mükemmel bir gün!",
    image:
      "https://images.pexels.com/photos/2567435/pexels-photo-2567435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "7",
    name: "Zeynep",
    status: "Güzel bir hafta!",
    image:
      "https://images.pexels.com/photos/1190980/pexels-photo-1190980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "8",
    name: "Ali",
    status: "Tatil keyfi.",
    image:
      "https://images.pexels.com/photos/4673476/pexels-photo-4673476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "9",
    name: "Ece",
    status: "Çalışmaya devam.",
    image:
      "https://images.pexels.com/photos/4673476/pexels-photo-4673476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "10",
    name: "Kadir",
    status: "Yeni projeye başlıyoruz!",
    image:
      "https://images.pexels.com/photos/3458278/pexels-photo-3458278.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "11",
    name: "Cem",
    status: "Kahvemi içerken yeni bir gün başlıyor.",
    image:
      "https://images.pexels.com/photos/1036625/pexels-photo-1036625.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "12",
    name: "Elif",
    status: "Başarı bizim işimiz.",
    image:
      "https://images.pexels.com/photos/6695855/pexels-photo-6695855.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "13",
    name: "Barış",
    status: "Doğayla iç içe bir hayat.",
    image:
      "https://images.pexels.com/photos/1170414/pexels-photo-1170414.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "14",
    name: "Leyla",
    status: "Yeni başlangıçlar.",
    image:
      "https://images.pexels.com/photos/772179/pexels-photo-772179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "15",
    name: "Murat",
    status: "Dünyayı keşfetmeye gidiyorum.",
    image:
      "https://images.pexels.com/photos/3070043/pexels-photo-3070043.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "16",
    name: "Büşra",
    status: "Sanatla ilgileniyorum.",
    image:
      "https://images.pexels.com/photos/1218689/pexels-photo-1218689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "17",
    name: "Yusuf",
    status: "Çalışma moduna girdim.",
    image:
      "https://images.pexels.com/photos/5202657/pexels-photo-5202657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "18",
    name: "Seda",
    status: "Yeni bir başlangıç!",
    image:
      "https://images.pexels.com/photos/4675724/pexels-photo-4675724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "19",
    name: "Veli",
    status: "Yolculuğa çıkıyorum.",
    image:
      "https://images.pexels.com/photos/1581749/pexels-photo-1581749.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "20",
    name: "Özge",
    status: "Geceyi sabaha kadar çalışarak geçiriyorum.",
    image:
      "https://images.pexels.com/photos/4675724/pexels-photo-4675724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  // Bu şekilde devam ederek 100 kişi ekleyebilirsiniz.
];

const Shuffle = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const bottomSheetRef = useRef(); // Bottom sheet referansı

  // Kullanıcıları, arama sorgusuna göre filtrele
  const filteredUsers = users?.filter((user) =>
    user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <SafeAreaView />
      <StatusBar barStyle="light-content" backgroundColor="#1c1c2e" />

      {/* Search Bileşeni */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
          inputStyle={{
            minHeight: 0 // Add this
          }}
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => bottomSheetRef?.current?.open()}
        >
          <MaterialIcons name="filter-list" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Kullanıcı Listesi */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredUsers?.map((user) => (
          <View key={user.id} style={styles.card}>
            <Image source={{ uri: user.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.status}>{user.status}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Sheet */}
      <RBSheet
        ref={bottomSheetRef}
        height={250}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: "#2a2a3e",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.sheetTitle}>Filter Options</Text>
          {/* Buraya filter seçeneklerini ekleyebilirsiniz */}
          <Text style={styles.sheetOption}>Option 1</Text>
          <Text style={styles.sheetOption}>Option 2</Text>
          <Text style={styles.sheetOption}>Option 3</Text>
        </View>
      </RBSheet>
    </View>
  );
};

export default Shuffle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c2e",
  },
  header: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  searchbar: {
    height:40,
    width: "90%",
  },
  filterButton: {
    marginLeft: 10,
  },
  scrollView: {
    paddingBottom: 20,
    paddingVertical: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2a2a3e",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  status: {
    fontSize: 14,
    color: "#b0b0b0",
  },
  bottomSheetContent: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  sheetOption: {
    fontSize: 16,
    color: "#b0b0b0",
    marginBottom: 10,
  },
});
