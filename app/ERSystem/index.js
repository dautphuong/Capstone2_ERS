/**
 * @format
 */
import {AppRegistry} from 'react-native';
import Login from './Components/Login';
import Register from './Components/Register';
import Tab from './Components/Tabs';
import ListTopic from './Components/ListTopic';
import ListLesson from './Components/ListLesson';
import Navigator from './Navigator';
import {name as appName} from './app.json';

 AppRegistry.registerComponent(appName, () => Navigator);

