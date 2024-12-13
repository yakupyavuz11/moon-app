import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RTCView, mediaDevices } from 'react-native-webrtc';

const VideoChat = () => {
  const [localStream, setLocalStream] = useState(null);

  useEffect(() => {
    const startStream = async () => {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setLocalStream(stream);
    };
    startStream();
  }, []);

  return (
    <View style={styles.container}>
      {localStream && (
        <RTCView
          streamURL={localStream.toURL()}
          style={styles.video}
        />
      )}
      <Button title="Start Call" onPress={() => console.log('Start Call')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  video: { width: '100%', height: 300 },
});

export default VideoChat;
