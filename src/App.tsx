import {
  BottomTabNavigationEventMap,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  NavigationHelpers,
  ParamListBase,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon, {IconName} from './Component/Atoms/Icon';
import {ThemeProvider, useTheme} from './Context/ThemeContext';
import {navigationRef, RootStackParamList, Screens} from './Screens';
import ActivityScreen from './Screens/ActivityScreen';
import HomeScreen from './Screens/HomeScreen';
import SettingsScreen from './Screens/SettingsScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const bottomTabs: {
  name: string;
  icon: IconName;
  iconInactive: IconName;
  route: keyof RootStackParamList;
}[] = [
  {
    name: 'Home',
    icon: 'home-filled',
    iconInactive: 'home',
    route: 'HomeScreen',
  },
  {
    name: 'Activity',
    icon: 'clock',
    iconInactive: 'clock',
    route: 'ActivityScreen',
  },
  {
    name: 'Setting',
    icon: 'settings-filled',
    iconInactive: 'settings',
    route: 'SettingsScreen',
  },
];

const BottomTabView = ({
  stateIndex,
  navigation,
}: {
  stateIndex: number;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}) => {
  const {colors, width} = useTheme();
  async function navigateTab(tabItem: any) {
    navigation.navigate(tabItem?.route);
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: colors.basic1,
        justifyContent: 'space-between',
        paddingHorizontal: width * 0.05,
        paddingVertical: width * 0.05,
        borderTopLeftRadius: width * 0.1,
        borderTopRightRadius: width * 0.1,
        shadowColor: colors.basic4,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.5,
        shadowRadius: 1,
        elevation: 4,
      }}>
      {bottomTabs.map((i, idx) => {
        const active = stateIndex === idx;
        return (
          <TouchableOpacity
            key={`${idx}_tab_${i.name}-tabBar`}
            style={[
              {
                alignItems: 'center',
                justifyContent: 'center',
                padding: width * 0.03,
                backgroundColor: active ? colors.background2 : undefined,
                borderRadius: width * 0.1,
              },
            ]}
            onPress={() => navigateTab(i)}>
            <Icon
              name={active ? i.icon : i.iconInactive}
              size={20}
              color={active ? colors.color1 : colors.basic3}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MemoizedBottomTabView = React.memo(BottomTabView);
export function TabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => (
        <MemoizedBottomTabView
          stateIndex={props.state.index}
          navigation={props.navigation}
        />
      )}
      screenOptions={{
        unmountOnBlur: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}

function NavigationApp() {
  const {theme} = useTheme(); // Now we are calling useTheme within ThemeProvider context

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer theme={theme} ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Group>
            {Screens.map((i, idx): JSX.Element => {
              return (
                <Stack.Screen
                  key={`screens-${idx}`}
                  name={i.name}
                  component={i.component}
                  options={i.options}
                />
              );
            })}
          </Stack.Group>
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationApp />
    </ThemeProvider>
  );
}
