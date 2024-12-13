import React from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";

const Stars = () => {
  const favoriteUsers = [
    {
      id: 1,
      name: "John Doe",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: "https://via.placeholder.com/150",
    },
  ];

  const starredUsers = [
    {
      id: 1,
      name: "Michael Johnson",
      avatar: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Emily Davis",
      avatar: "https://via.placeholder.com/150",
    },
  ];

  return (
    <ScrollView className="flex-1 bg-purple-50">
      <SafeAreaView/>
      <View className="p-4">
        <Text className="text-xl font-bold text-purple-800 mb-4">
          Favori Kullanıcılar
        </Text>
        {favoriteUsers.map((user) => (
          <View
            key={user.id}
            className="flex-row items-center bg-white p-3 mb-2 rounded-lg shadow-sm border border-purple-300"
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <Text className="text-lg font-medium text-purple-700">
              {user.name}
            </Text>
          </View>
        ))}
      </View>

      <View className="p-4">
        <Text className="text-xl font-bold text-purple-800 mb-4">
          Yıldızlı Kullanıcılar
        </Text>
        {starredUsers.map((user) => (
          <View
            key={user.id}
            className="flex-row items-center bg-white p-3 mb-2 rounded-lg shadow-sm border border-purple-300"
          >
            <Image
              source={{ uri: user.avatar }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <Text className="text-lg font-medium text-purple-700">
              {user.name}
            </Text>
            <Text className="ml-auto bg-yellow-400 px-2 py-1 rounded-lg text-white font-bold text-xs">
              ⭐ Yıldızlı
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default Stars;
