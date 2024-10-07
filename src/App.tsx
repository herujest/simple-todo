import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Screens} from './Screens';
import {ThemeProvider, useTheme} from './Context/ThemeContext';

const Stack = createNativeStackNavigator();

function NavigationApp() {
  const {theme} = useTheme(); // Now we are calling useTheme within ThemeProvider context

  return (
    <NavigationContainer theme={theme}>
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
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NavigationApp />
    </ThemeProvider>
  );
}
