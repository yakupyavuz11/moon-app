import React, { useRef, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { COLORS } from "@/constants/theme";

export default function UserProfile() {
  const navigation = useNavigation();
  const bottomSheetRef = useRef(null);
  
  const snapPoints = ["25%", "50%", "100%"]; // BottomSheet boyutları
  
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenBottomSheet = () => {
    console.log("BottomSheet Ref:", bottomSheetRef.current); // Log ekle
    bottomSheetRef.current?.expand(); // Aç bottom sheet
  };
  

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Ionicons name="arrow-back" size={30} color="#fff" />
      </TouchableOpacity>

      <ScrollView>
        {/* Profile Section */}
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/29748690/pexels-photo-29748690/free-photo-of-kendine-guvenen-gulumsemeyle-poz-veren-zarif-kadin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfoContainer}>
            <Text style={styles.name}>mavigokyuzu221</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Chat")}
              style={[styles.circleButton, { backgroundColor: COLORS.primary }]}
            >
              <Text style={styles.buttonText}>💬</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            Software, Technology, Entrepreneurship Enthusiast.{"\n"}
          </Text>
        </View>

        {/* BottomSheet Trigger */}
        <TouchableOpacity
  style={styles.moreButton}
  onPress={handleOpenBottomSheet}
  activeOpacity={0.7} // Dokunma efektini gör
  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Dokunma alanını genişlet
>
<Ionicons style={styles.moreButtonText} name="ellipsis-vertical" size={30} color="#fff" />
</TouchableOpacity>

      </ScrollView>

      {/* BottomSheet */}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true} // Kapatmak için aşağı kaydırmayı etkinleştir
        backgroundStyle={styles.bottomSheetBackground}
      >
        <View style={styles.bottomSheetContent}>
          <Text style={styles.bottomSheetText}>Options:</Text>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <Text style={styles.optionText}>Block</Text>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  profileImage: {
    width: 400,
    height: 300,
    borderWidth: 2,
    borderColor: "#444",
    alignSelf: "center",
  },
  name: {
    color: COLORS.black,
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  aboutSection: {
    marginTop: 5,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: COLORS.black,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  aboutText: {
    color: COLORS.black,
    fontSize: 16,
    lineHeight: 22,
  },
  profileInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  circleButton: {
    width: 50,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "auto",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  moreButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  moreButtonText: {
    color: "#fff",
    fontSize: 30,
  },
  bottomSheetBackground: {
    backgroundColor: "#333", // BottomSheet rengi
  },
  bottomSheetContent: {
    padding: 20,
    backgroundColor: "#333",
  },
  bottomSheetText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    backgroundColor: "#444",
    marginBottom: 10,
    borderRadius: 5,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
  },
});
