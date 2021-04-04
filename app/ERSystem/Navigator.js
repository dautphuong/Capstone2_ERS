import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import ListTopic from './Components/ListTopic';
import ListLesson from './Components/ListLesson';
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
          <Stack.Screen name="Home" 
          component={Home} 
          options={{
            headerShown: false,
            headerTitle: false,
            headerStyle: {
                backgroundColor: '#78C8E8',
                
            }
          }}
          />
          <Stack.Screen name="ListTopic" 
          component={ListTopic} 
          options={{
            headerTitle: 'Chủ Đề',
            headerStyle: {
                backgroundColor: '#78C8E8',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          />
          <Stack.Screen name="ListLesson" 
          component={ListLesson} 
            options={({ route }) => 
           ({ 
            title: route.params.Topics ,
              headerStyle: {
              backgroundColor: '#78C8E8',
             },
             headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15,
              right: 25
             },
            })
          }
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default AppNavigator;