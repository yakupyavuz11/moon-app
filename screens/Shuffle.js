import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet'; // Bottom sheet importu
import { MaterialIcons } from '@expo/vector-icons'; // Filter ikonu için

const users = [
  {
    id: '1',
    name: 'Yakup',
    status: 'Selam kaptan!',
    image: 'https://images.pexels.com/photos/7421636/pexels-photo-7421636.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Osman',
    status: '20 yaş İstanbul.',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  // Daha fazla kullanıcı...
];

const Shuffle = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const bottomSheetRef = useRef(); // Bottom sheet referansı

  // Kullanıcıları, arama sorgusuna göre filtrele
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>

      {/* StatusBar */}
      <StatusBar barStyle="light-content" backgroundColor="#1c1c2e" />

      {/* Search Bileşeni */}
      <View style={styles.header}>
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        <TouchableOpacity style={styles.filterButton} onPress={() => bottomSheetRef.current.open()}>
          <MaterialIcons name="filter-list" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Kullanıcı Listesi */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        {filteredUsers.map((user) => (
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
            backgroundColor: '#2a2a3e',
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
    backgroundColor: '#1c1c2e',
  },
  header: {
    marginTop: 50,
    backgroundColor: '#1c1c2e',
    paddingHorizontal: 25,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  searchbar: {
    flex: 1,
    height: 40,
    borderRadius: 30,
  },
  filterButton: {
    marginLeft: 10,
  },
  scrollView: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2a2a3e',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
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
    color: '#fff',
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  bottomSheetContent: {
    padding: 20,
  },
  sheetTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sheetOption: {
    fontSize: 16,
    color: '#b0b0b0',
    marginBottom: 10,
  },
});
