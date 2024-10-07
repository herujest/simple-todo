import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';

interface INavigationOption {
  name: string;
  component: React.ComponentType<any>;
  options: NativeStackNavigationOptions;
}

export const Screens: Array<INavigationOption> = [
  {
    name: 'HomeScreen',
    component: HomeScreen,
    options: {
      headerShown: false,
    },
  },
];
