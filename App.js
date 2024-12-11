import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { AppNavigation } from './navigation/AppNavigation'; // AppNavigation'ı doğru import et

export default function App() {
  return <AppNavigation />; // AppNavigation'ı burada render et
}
