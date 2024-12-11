import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Account from "../screens/Account";
import Messages from "../screens/Messages";
import Explore from "../screens/Explore";
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
          return (
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;
                  if (route.name === "Messaging") {
                    iconName = "chatbubbles";
                  } else if (route.name === "Account") {
                    iconName = "person";
                  } else if (route.name === "Explore") {
                    iconName = "shuffle";
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
              })}
            >
              <Tab.Screen name="Messages" component={Messages} />
              <Tab.Screen name="Explore" component={Explore} />
              <Tab.Screen name="Account" component={Account} />
            </Tab.Navigator>
          );
        };
        
        export default BottomTabNavigator;
        