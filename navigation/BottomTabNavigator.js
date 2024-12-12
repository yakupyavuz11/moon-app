import React from "react";
import { StyleSheet, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Account from "../screens/Account";
import Messages from "../screens/Messages";
import Shuffle from "../screens/Shuffle";
import Stars from "../screens/Stars";
import { COLORS } from "../constants/theme";
import Discovery from "../screens/Discovery";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 35,
          marginLeft: 20,
          marginRight: 20,
          elevation: 0,
          backgroundColor: COLORS.primary,
          borderRadius: 18,
          height: 72,
          alignItems: "center",
          ...styles.shadow,
        },
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === "Messages") {
            iconName = "chatbubbles";
          } else if (route.name === "Account") {
            iconName = "person";
          } else if (route.name === "Shuffle") {
            iconName = "shuffle";
          } else if (route.name === "Stars") {
            iconName = "star";
          }else if (route.name === "Discovery") {
            iconName = "compass";
          }

          return (
            <View style={styles.iconContainer}>
              <Ionicons
                name={iconName}
                size={28}
                color={focused ? "#FFFFFF" : "#2c2651"}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Discovery" component={Discovery} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="Shuffle" component={Shuffle} />
      <Tab.Screen name="Stars" component={Stars} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
    width: 50,
    height: 50,
    marginTop: 10,
    focused: true,
  },
});
