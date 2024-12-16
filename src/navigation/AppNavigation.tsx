import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./BottomTabNavigator";
import Intro from "@/screens/Intro";
import Signup from "@/screens/Signup";
import ProfileReadyScreen from "@/screens/ProfileReadyScreen";
import ProfileSetupScreen from "@/screens/ProfileSetupScreen";
import Chat from "@/screens/ChatScreen";
import UserProfile from "@/screens/UserProfile";
import Settings from "@/screens/Settings";
import EditProfile from "@/screens/EditProfile";
import ChangeEmail from "@/screens/ChangeEmail";
import ChangePassword from "@/screens/ChangePassword";
import Language from "@/screens/Language";
import ForgetPasswordScreen from "@/screens/ForgetPassword";
const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomTabNavigator"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="ProfileReady" component={ProfileReadyScreen} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Forget" component={ForgetPasswordScreen} />

        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ChangeEmail" component={ChangeEmail} />
        <Stack.Screen
          name="BottomTabNavigator"
          component={BottomTabNavigator}
        />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Language" component={Language} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };
