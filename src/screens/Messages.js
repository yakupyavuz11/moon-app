import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Messages = () => {
  const [chats, setChats] = useState([]);
  const [contacts, setContacts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Fetch the chats and contacts from the server
    const fetchChats = async () => {
      try {
        const response = await fetch("/api/chats/list");
        if (response.ok) {
          const data = await response.json();
          setChats(data); // Set the fetched chats into state
        } else {
          console.error("Failed to fetch chats");
        }
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    // Fetch contacts (replace with your actual API if necessary)
    const fetchContacts = async () => {
      const data = [
        {
          id: "1",
          name: "Phillip",
          image: "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "2",
          name: "Alfredo",
          image: "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "3",
          name: "Jaylon",
          image: "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "4",
          name: "Tatiana",
          image: "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
        {
          id: "5",
          name: "Terry",
          image: "https://images.pexels.com/photos/4506436/pexels-photo-4506436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        },
      ];
      setContacts(data);
    };

    fetchChats();
    fetchContacts();
  }, []);

  // Find active users by matching contact names with messages
  const activeContacts = contacts.filter((contact) =>
    chats.some((chat) => chat.name.includes(contact.name))
  );

  const renderContacts = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {activeContacts.map((contact) => (
        <TouchableOpacity
          key={contact.id}
          style={styles.contactContainer}
          onPress={() =>
            navigation.navigate("UserProfile", {
              name: contact.name,
              image: contact.image,
            })
          }
        >
          <Image source={{ uri: contact.image }} style={styles.contactImage} />
          <Text style={styles.contactName}>{contact.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderMessages = ({ item }) => (
    <TouchableOpacity
      style={styles.messageContainer}
      onPress={() => navigation.navigate("Chat", { name: item.name })}
    >
      <Image source={{ uri: item.image }} style={styles.messageImage} />
      <View style={styles.messageContent}>
        <Text style={styles.messageName}>{item.name}</Text>
        <Text style={styles.messageText}>{item.message}</Text>
      </View>
      <Text style={styles.messageTime}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f7f7f7" }}>
      <Text style={styles.header}>Messages</Text>

      {/* Active Users Section */}
      <View style={styles.activeUsersSection}>
        <Text style={styles.title}>Active Users</Text>
        {renderContacts()}
      </View>

      {/* Chat Messages Section */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={renderMessages}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  activeUsersSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  contactContainer: {
    alignItems: "center",
    marginRight: 15,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#00D984",
  },
  contactName: {
    color: "#555",
    marginTop: 5,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  messageImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  messageContent: {
    flex: 1,
    marginLeft: 10,
  },
  messageName: {
    fontWeight: "bold",
  },
  messageText: {
    color: "#555",
  },
  messageTime: {
    color: "#aaa",
    fontSize: 12,
  },
});

export default Messages;
