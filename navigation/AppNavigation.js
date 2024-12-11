import React from "react";
import { NavigationContainer } from "@react-navigation/native"; 
import { createStackNavigator } from "@react-navigation/stack"; 
import Intro from "../screens/Intro"; 
import Signup from "../screens/Signup";
import ProfileSetup from "../screens/ProfileSetupScreen";

const Stack = createStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer> {/* NavigationContainer ile sarmalayın */}
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Signup" component={Signup} />
<Stack.Screen name = "ProfileSetup" component = {ProfileSetup} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { AppNavigation };