import React, { useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { name = "User", image = "https://placekitten.com/140/140" } =
    route.params || {};

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: `Merhaba! ${name} ile nasıl yardımcı olabilirim?`,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Destek Botu",
        avatar:
          "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
    },
  ]);

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
    <View style={styles.container}>
      {/* Profil Bar */}
      // Profil Bar Bölümü
<View style={styles.profileBar}>
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.backButton}
  >
    <Text style={styles.backText}>←</Text>
  </TouchableOpacity>

  {/* Profil Resmi Tıklanabilir Hale Getirildi */}
  <TouchableOpacity
    onPress={() => navigation.navigate("UserProfile")} // UserProfile sayfasına yönlendirme
    style={{ flexDirection: "row", alignItems: "center" }}
  >
    <Image
      source={{ uri: image }}
      style={styles.profileImage}
    />
    <Text style={styles.profileName}>{name}</Text>
  </TouchableOpacity>
</View>

      {/* Chat Component */}
      <View style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{ _id: 1 }}
          placeholder="Mesaj yaz..."
          renderBubble={renderBubble}
          textInputStyle={styles.textInput}
          messagesContainerStyle={styles.messagesContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6A5AE0",
  },
  profileBar: {
    marginTop: 40,
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
