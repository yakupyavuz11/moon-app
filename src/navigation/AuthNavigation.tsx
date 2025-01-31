import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Intro from "@/screens/Intro";
import Signup from "@/screens/Signup";
import ProfileReadyScreen from "@/screens/ProfileReadyScreen";
import ProfileSetupScreen from "@/screens/ProfileSetupScreen";
import Login from "@/screens/Login";
import BottomTabNavigator from "./BottomTabNavigator";
import ForgetPasswordScreen from "@/screens/ForgetPassword";
import Settings from "@/screens/Settings";
const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
      <Stack.Screen name="ProfileReady" component={ProfileReadyScreen} />
      <Stack.Screen name="Forget" component={ForgetPasswordScreen} />
    <Stack.Screen name="Settings" component={Settings} />
   
    </Stack.Navigator>
  );
};

export default AuthNavigator;
