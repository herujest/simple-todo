import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {TabNavigator} from '../App';
import AddActivity, {ActivityDTO} from './AddActivity';
import AddSingleTask from './AddSingleTask';
import WelcomePage from './WelcomePage';
import ActivityGoal from './ActivityGoal';

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
  {
    name: 'AddActivity',
    component: AddActivity,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'ActivityGoal',
    component: ActivityGoal,
    options: {
      headerShown: false,
    },
  },
  {
    name: 'AddSingleTask',
    component: AddSingleTask,
    options: {
      headerShown: false,
    },
  },
];

export type RootStackParamList = {
  WelcomePage: undefined;
  Tabs: undefined;
  HomeScreen: undefined;
  ActivityScreen: undefined;
  SettingsScreen: undefined;
  AddActivity: undefined;
  ActivityGoal: {title: string; description?: string; activeType: ActivityDTO};
  AddSingleTask: undefined;
};

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate(
  name: keyof RootStackParamList,
  params?: any,
  key?: string,
) {
  if (navigationRef.isReady()) {
    navigationRef.navigate({name, key, params});
  }
}

export function navigateAndReset(
  routes: Array<{name: keyof RootStackParamList; params?: any; key?: any}> = [],
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes,
      }),
    );
  }
}

export function navigateAndSimpleReset(
  name: keyof RootStackParamList,
  index = 0,
) {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index,
        routes: [{name}],
      }),
    );
  }
}

export function navigateBack() {
  navigationRef.dispatch(CommonActions.goBack());
}

export function replace(name: keyof RootStackParamList, params?: any) {
  navigationRef.dispatch(StackActions.replace(name, params));
}
