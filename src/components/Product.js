// components/product.jsx
import { View, Text, Image } from "react-native";

export default function Product({ image, name, price, column_width }) {
  return (
    <View style={{ width: column_width }} className="justify-center p-3">
      <Image
        className="m-5 h-56 w-full mx-auto object-cover bg-slate-500 rounded-lg"
        source={{ uri: image }}
      />
      <Text className="text-dark mb-3">{name?.substring(0, 30) + "..."}</Text>
      <Text className="text-dark dark:text-white font-bold">{`$${price}.00`}</Text>
    </View>
  );
}
