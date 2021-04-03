import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Register from './Components/Register';

const Stack = createStackNavigator(); 

 function AppNavigator() {
    return (
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Login" 
          component={Login} 
          options={{
            headerShown: false
          }}
          />
          <Stack.Screen name="Register" 
          component={Register} 
          options={{
            headerTitle: false,
            headerStyle: {
                backgroundColor: '#78C8E8',
            }
          }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default AppNavigator;