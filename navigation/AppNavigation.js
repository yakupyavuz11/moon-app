import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "../screens/Intro";
import Signup from "../screens/Signup";
import ProfileSetup from "../screens/ProfileSetupScreen";
import ProfileReadyScreen from "../screens/ProfileReadyScreen";
import BottomTabNavigator from "./BottomTabNavigator";
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      {" "}
      {/* NavigationContainer ile sarmalayın */}
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetup} />
      <Stack.Screen name="ProfileReady" component={ProfileReadyScreen} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };
