// components/product.jsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

export default function Product({ image, name, price, column_width }) {
  const navigation = useNavigation(); // Access navigation hook

  const handleProductClick = () => {
    navigation.navigate("UserProfile"); // Navigate to UserProfile screen
  };

  return (
    <View style={{ width: column_width }} className="justify-center p-3">
      <TouchableOpacity onPress={handleProductClick}>
        <Image
          className="m-5 h-56 w-full mx-auto object-cover bg-slate-500 rounded-lg"
          source={{ uri: image }}
        />
      </TouchableOpacity>
      <Text className="text-black mb-3">{name?.substring(0, 30) + "..."}</Text>
      {/*  <Text className="text-black font-bold">{`$${price}.00`}</Text>*/}
    </View>
  );
}
