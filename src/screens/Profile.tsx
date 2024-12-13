import useStore from "@/store/useStore";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { logout } = useStore();
  return (
    <ScrollView
      className="flex-1 bg-purple-100"
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      showsVerticalScrollIndicator={false}
    >
      {/* Üst Bilgi */}
      <View
        className="bg-purple-700 py-12 px-4 rounded-b-3xl"
        style={{ paddingTop: safeAreaInsets.top }}
      >
        <Image
          source={{
            uri: "https://images.pexels.com/photos/4673476/pexels-photo-4673476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
          }}
          className="w-24 h-24 rounded-full mx-auto border-4 border-white"
        />
        <Text className="text-center text-white text-2xl font-bold mt-4">
          Furkan Türkyılmaz
        </Text>
        <Text className="text-center text-purple-200 text-sm">
          React Native Developer
        </Text>
      </View>

      {/* Kullanıcı Detayları */}
      <View className="mt-8 mx-4">
        <View className="bg-white shadow-md rounded-lg p-4 mb-4">
          <Text className="text-purple-800 text-lg font-semibold">
            Hakkında
          </Text>
          <Text className="text-gray-700 mt-2">
            Selam, ben Furkan! React Native ile mobil uygulamalar geliştirme
            konusunda uzmanlaşmış bir yazılım geliştiricisiyim. Dinamik ve
            yaratıcı çözümler üretiyorum.
          </Text>
        </View>

        <View className="bg-white shadow-md rounded-lg p-4 mb-4">
          <Text className="text-purple-800 text-lg font-semibold">
            İletişim Bilgileri
          </Text>
          <Text className="text-gray-700 mt-2">
            📧 trkyilmazfurkan@gmail.com
          </Text>
          <Text className="text-gray-700 mt-1">📞 +90 (543) 501 58 59</Text>
        </View>

        <View className="bg-white shadow-md rounded-lg p-4">
          <Text className="text-purple-800 text-lg font-semibold">
            Sosyal Medya
          </Text>
          <Text className="text-blue-700 mt-2 underline">
            LinkedIn: /furkanturkyilmaz
          </Text>
          <Text className="text-blue-700 mt-1 underline">
            GitHub: /furkanturkyilmaz
          </Text>
        </View>
      </View>

      {/* Düzenle Butonu */}
      <TouchableOpacity
        className="bg-purple-700 mx-4 mt-6 py-3 rounded-lg"
        onPress={() => alert("Profil düzenleme sayfasına gidiliyor!")}
      >
        <Text className="text-center text-white text-lg font-bold">
          Profili Düzenle
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-200 mx-4 mt-6 py-3 rounded-lg"
        onPress={() => logout()}
      >
        <Text className="text-center text-white text-lg font-bold">
          Çıkıp yap
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;
