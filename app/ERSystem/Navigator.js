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
import CalendarExam from './Components/CalendarExam';
import ReadyContest from './Components/ReadyContest';
import Quiz from './Components/Quiz';
import Result from './Components/Result';
import Profile from './Components/Profile';
import PracticeList from './Components/PracticeList';
import quizLesson from './Components/quizLesson';
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
            headerShown: false
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
        <Stack.Screen name="Profile"
          component={Profile}
          options={{
            headerTitle: 'Trang Cá Nhân',
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
        <Stack.Screen name="CalendarExam"
          component={CalendarExam}
          options={{
            headerTitle: 'Danh Sách Cuộc Thi',
            headerStyle: {
              backgroundColor: '#78C8E8',

            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 20,
              right: 25
            },
          }}
        />
        <Stack.Screen name="ReadyContest"
          component={ReadyContest}
          options={({ route }) =>
          ({
            idExam: route.params.idExam,
            title: route.params.Contest,
            idContest: route.params.idContest,
            headerStyle: {
              backgroundColor: '#78C8E8',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 15,
              right: 25
            },
            unmountOnBlur: true
          })
          }
          listeners={({ navigation }) => ({
            blur: () => navigation.setParams({ screen: undefined }),
          })}
        />
        <Stack.Screen name="PracticeList"
          component={PracticeList}
          options={{
            headerTitle: 'Danh sách bài tập',
            headerStyle: {
              backgroundColor: '#78C8E8',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}

        />
        <Stack.Screen name="Quiz"
          component={Quiz}
          options={({ route }) =>
          ({
            id: route.params.id,
            title: route.params.name,
            timeSet: route.params.timeSet,
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
        <Stack.Screen name="quizLesson"
          component={quizLesson}
          options={({ route }) =>
          ({
            idLesson: route.params.idLesson,
            title: route.params.title,
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
        <Stack.Screen name="Result"
          component={Result}
          options={({ route }) =>
          ({
            idExam: route.params.idExam,
            title: route.params.Contest,
            idHistory: route.params.idHistory,
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
    </NavigationContainer >
  );
}

function TabScreen() {
  return (
    <TabNavigator.Navigator
      tabBarOptions={{
        initialRouteName: "Home",
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
        name="Dịch"
        component={Translate}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="google-translate" color={color} size={size} />
          ),
        }} />
      <TabNavigator.Screen name="Lịch Sử" component={History}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" color={color} size={size} />
          ),
          unmountOnBlur: true
        }}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
      />
    </TabNavigator.Navigator>

  )
}
export default AppNavigator;