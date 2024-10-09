import React from 'react';
import {
  SafeAreaView,
  StatusBarProps,
  StyleProp,
  StyleSheet,
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
  const {colors, height} = useTheme();

  return (
    <>
      <FocusAwareStatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <SafeAreaView
        style={[
          styles.container,
          {
            backgroundColor: statusBar?.backgroundColor || colors.background1,
          },
        ]}>
        <View
          style={[
            style,
            styles.containerBody,
            {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerBody: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Container;
