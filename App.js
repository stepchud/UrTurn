import { StackNavigator } from 'react-navigation';

import {
  HomeScreen,
  SettingsScreen
} from './app/screens';

export default App = StackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen }
})
