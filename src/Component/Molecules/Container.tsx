import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StatusBarProps,
  StyleProp,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {useTheme} from '../../Context/ThemeContext';
import FocusAwareStatusBar from '../Atoms/FocusAwareStatusBar';

interface IContainer extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  statusBar?: StatusBarProps;
}
const Container = ({children, statusBar, style}: IContainer) => {
  const {theme, height} = useTheme();
  console.log('theme', theme);

  return (
    <>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[
          {backgroundColor: statusBar?.backgroundColor || 'white', flex: 1},
        ]}>
        <View
          style={[
            style,
            {
              flex: 1,
              flexDirection: 'column',
              height: height,
              backgroundColor: 'white',
            },
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Container;
