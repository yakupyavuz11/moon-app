import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";
import Discovery from "@/screens/Discovery";
import Messages from "@/screens/Messages";
import Stars from "@/screens/Stars";
import ProfileScreen from "@/screens/Profile";

const Tab = createBottomTabNavigator();

const ICONS = {
  Discovery: "compass",
  Messages: "chatbubbles",
  Stars: "star",
  Account: "person",
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Discovery"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused }) => (
          <View style={styles.iconContainer}>
            <Ionicons
              name={ICONS[route.name]}
              size={28}
              color={focused ? COLORS.white : COLORS.secondary}
            />
          </View>
        ),
      })}
    >
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Discovery" component={Discovery} />
      <Tab.Screen name="Stars" component={Stars} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    position: "absolute",
    bottom: 20,
    marginHorizontal: 20,
    elevation: 8,
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    height: 60,
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 50,
    height: 50,
  },
});
