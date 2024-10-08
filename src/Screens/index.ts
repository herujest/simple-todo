import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {TabNavigator} from '../App';
import WelcomePage from './WelcomePage';

interface INavigationOption {
  name: string;
  component: React.ComponentType<any>;
  options: NativeStackNavigationOptions;
}

export const Screens: Array<INavigationOption> = [
  {
    name: 'WelcomePage',
    component: WelcomePage,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'Tabs',
    component: TabNavigator,
    options: {
      headerShown: false,
      freezeOnBlur: true,
    },
  },
];

export type RootStackParamList = {
  WelcomePage: undefined;
  Tabs: undefined;
  HomeScreen: undefined;
  ActivityScreen: undefined;
  SettingsScreen: undefined;
};
