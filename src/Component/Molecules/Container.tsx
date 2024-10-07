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
  const {theme, colors, height} = useTheme();

  return (
    <>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[
          {
            backgroundColor: statusBar?.backgroundColor || colors.background1,
            flex: 1,
          },
        ]}>
        <View
          style={[
            style,
            {
              flex: 1,
              flexDirection: 'column',
              height: height,
              backgroundColor: colors.background1,
            },
          ]}>
          {children}
        </View>
      </SafeAreaView>
    </>
  );
};

export default Container;
