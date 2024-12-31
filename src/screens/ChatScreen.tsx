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
  StatusBar, // Import StatusBar from react-native
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const ChatScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [messages, setMessages] = useState([]);

  const {
    name = "User",
    image = "https://images.pexels.com/photos/29958104/pexels-photo-29958104/free-photo-of-kahverengi-deri-ceketli-kizil-sacli-zarif-kadin.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  } = route.params || {};

  // JSON formatında mesaj ekliyoruz
  useEffect(() => {
    const initialMessage = {
      _id: 1,
      text: "Merhaba, nasılsın?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Bot", // Bot ismi
        avatar: image,
      },
    };
    setMessages([initialMessage]);
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
          backgroundColor: "#6b53ff",
        },
        right: {
          backgroundColor: "#7e57c2",
        },
      }}
      textStyle={{
        left: {
          color: "#fff",
        },
        right: {
          color: "#fff",
        },
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Set the StatusBar to purple */}
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.primary} />

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
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 15,
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
    fontSize: 18,
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
