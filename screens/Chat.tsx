import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert } from 'react-native';
import * as SignalR from '@microsoft/signalr';

const generateRandomUsername = () => {
  const usernames = ['User1', 'User2', 'User3', 'User4', 'User5'];
  return usernames[Math.floor(Math.random() * usernames.length)];
};

const ChatApp = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(generateRandomUsername());

  useEffect(() => {
    const newConnection = new SignalR.HubConnectionBuilder()
      .withUrl('YOUR_SIGNALR_SERVER_URL')
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    newConnection.start()
      .then(() => {
        console.log('Connected!');
        newConnection.on('ReceiveMessage', (user, message) => {
          setMessages(prevMessages => [...prevMessages, { user, message }]);
        });
      })
      .catch(e => console.log('Connection failed: ', e));
  }, []);

  const sendMessage = async () => {
    if (connection.connectionStarted) {
      try {
        await connection.send('SendMessage', username, message);
        setMessage('');
      } catch (e) {
        console.log(e);
      }
    } else {
      Alert.alert('No connection to server yet.');
    }
  };

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.user}: {item.message}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
      <TextInput
        value={message}
        onChangeText={text => setMessage(text)}
        placeholder="Enter message"
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatApp;
