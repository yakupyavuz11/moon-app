import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "@/screens/Intro";
import Signup from "@/screens/Signup";
import ProfileReadyScreen from "@/screens/ProfileReadyScreen";
import ProfileSetupScreen from "@/screens/ProfileSetupScreen";
import Login from "@/screens/Login";
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
      <Stack.Navigator
        initialRouteName="Intro"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="ProfileReady" component={ProfileReadyScreen} />
      </Stack.Navigator>
  );
};

export default AuthNavigator;
