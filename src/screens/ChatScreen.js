import React, { useEffect, useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import axios from "axios"; // API'ye istek göndermek için axios
import { Ionicons } from "@expo/vector-icons";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const [messages, setMessages] = useState([]);

  const { name = "User", image = "https://placekitten.com/140/140" } =
    route.params || {};

  // Mesajları API'den çek
  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:3000/messages"); // Mesajları çekmek için API isteği
      const messagesFromAPI = response.data;

      // Mesajları GiftedChat formatına dönüştür
      const formattedMessages = messagesFromAPI.map((msg) => ({
        _id: msg.id,
        text: msg.message,
        createdAt: new Date(msg.created_at),
        user: {
          _id: msg.sender_id,
          name: msg.sender_name,
          avatar: "https://placekitten.com/140/140", // Fotoğraf URL'sini uygun şekilde ekleyebilirsiniz
        },
      }));

      setMessages(formattedMessages); // Mesajları state'e aktar
    } catch (error) {
      console.error("Mesajları çekerken hata oluştu:", error);
    }
  };

  useEffect(() => {
    fetchMessages(); // Mesajları çek
  }, []);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#d1c4e9",
        },
        right: {
          backgroundColor: "#7e57c2",
        },
      }}
      textStyle={{
        left: {
          color: "#000",
        },
        right: {
          color: "#fff",
        },
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.container}>
            {/* Profil Bar */}
            <View style={styles.profileBar}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>

              {/* Profil Resmi Tıklanabilir Hale Getirildi */}
              <TouchableOpacity
                onPress={() => navigation.navigate("UserProfile")}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image source={{ uri: image }} style={styles.profileImage} />
                <Text style={styles.profileName}>{name}</Text>
              </TouchableOpacity>
            </View>

            {/* Chat Component */}
            <View style={{ flex: 1 }}>
              <GiftedChat
                messages={messages}
                onSend={(messages) => onSend(messages)}
                user={{ _id: 1 }}
                placeholder={t("message_writer")}
                renderBubble={renderBubble}
                textInputStyle={styles.textInput}
                messagesContainerStyle={styles.messagesContainer}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  profileBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A5AE0",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 15,
  },
  backText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  profileName: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "#f3e8ff",
    borderRadius: 20,
    paddingHorizontal: 12,
    color: "#4a0072",
  },
  messagesContainer: {
    backgroundColor: "#f8f4fc",
  },
});

export default ChatScreen;
