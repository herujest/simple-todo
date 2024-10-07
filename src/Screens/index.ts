import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
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
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
];
