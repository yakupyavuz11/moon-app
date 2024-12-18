import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigation';
import { AppNavigation } from './AppNavigation';
import useStore from '@/store/useStore';


const Stack = createNativeStackNavigator();


const Navigation = () => {
 const { isLogin } = useStore();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isLogin ? (
          <Stack.Screen name="AppStack" component={AppNavigation} />
        ) : (
          <Stack.Screen name="AuthStack" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;