import React, { useState } from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { View } from "react-native";
import { styled } from "nativewind";


const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Merhaba! Size nasıl yardımcı olabilirim?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "Destek Botu",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: "#d1c4e9", // Sol baloncuk (Botun mesajları için)
          },
          right: {
            backgroundColor: "#7e57c2", // Sağ baloncuk (Kullanıcının mesajları için)
          },
        }}
        textStyle={{
          left: {
            color: "#000", // Bot mesaj metin rengi
          },
          right: {
            color: "#fff", // Kullanıcı mesaj metin rengi
          },
        }}
      />
    );
  };

  return (
    <View className="flex-1 bg-purple-800 mb-24">
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        placeholder="Mesaj yaz..."
        renderAvatarOnTop
        alwaysShowSend
        renderBubble={renderBubble}
        textInputStyle={{
          backgroundColor: "#f3e8ff",
          borderRadius: 20,
          paddingHorizontal: 12,
          color: "#4a0072",
        }}
        messagesContainerStyle={{
          backgroundColor: "#f8f4fc",
        }}
      />
    </View>
  );
};

export default ChatScreen;
