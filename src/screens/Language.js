import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const Language = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: "bold" }}>Dil Seçimi</Text>
      <Text style={{ marginBottom: 10 }}>Seçtiğiniz dili başarıyla değiştirin.</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Türkçe" onPress={() => alert("Türkçe seçildi")} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="English" onPress={() => alert("English selected")} />
        </View>
      </View>
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
  },
  buttonContainer: {
    flexDirection: "column", // Dikey düzen
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
  },
  buttonWrapper: {
    marginVertical: 10, // Dikey boşluk
    width: "80%", // Buton genişliği
  },
});
