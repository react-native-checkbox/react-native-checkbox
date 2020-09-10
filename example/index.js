/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
// You could alse use the function component
// import App from './AppFunction';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
