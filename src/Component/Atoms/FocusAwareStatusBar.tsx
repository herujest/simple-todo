import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {
  StatusBar,
  StatusBarProps,
  StatusBarPropsAndroid,
  StatusBarPropsIOS,
} from 'react-native';

type IStatusBarProps = StatusBarProps &
  StatusBarPropsAndroid &
  StatusBarPropsIOS;

const FocusAwareStatusBar = (props: IStatusBarProps) => {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
};

export default FocusAwareStatusBar;
