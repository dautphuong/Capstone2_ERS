import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Login from './Components/Login';
import Register from './Components/Register';
import Home from './Components/Home';
import ListTopic from './Components/ListTopic';
import ListLesson from './Components/ListLesson';
import LessonContent from './Components/LessonContent';
import Translate from './Components/Translate';
import History from './Components/History';
const Stack = createStackNavigator(); 
const TabNavigator = createBottomTabNavigator();
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
          component={TabScreen} 
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
              id: route.params.id,
              title: route.params.Topics,
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
          <Stack.Screen name="LessonContent" 
          component={LessonContent}  
            options={({ route }) => 
           ({ 
              id: route.params.idLesson,
              title: route.params.name,
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

  function TabScreen(){
    return (
        <TabNavigator.Navigator 
          tabBarOptions={{
          initialRouteName:"Home",
          activeTintColor: '#e91e63',
        }}>
          <TabNavigator.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              ),
            }}
          />
          <TabNavigator.Screen
            name="Translate"
            component={Translate}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="google-translate" color={color} size={size} />
              ),
            }} />
          <TabNavigator.Screen name="History" component={History}
            options={{
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="history" color={color} size={size} />
              ),
            }}
          />
        </TabNavigator.Navigator>

    )
  }
export default AppNavigator;