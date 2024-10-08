import React, {forwardRef} from 'react';
import {StyleProp, StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import {useTheme} from '../../../Context/ThemeContext';

interface IHeader extends ViewProps {
  androidStatusBarColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const Wrapper: React.FC<{
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}> = ({children, style}) => {
  const {colors} = useTheme();

  return (
    <View
      style={[styles.wrapper, {backgroundColor: colors.background1}, style]}>
      {children}
    </View>
  );
};

const Header = forwardRef<View, IHeader>(({style, children, ...props}, ref) => {
  return (
    <Wrapper style={style}>
      <View ref={ref} {...props}>
        {children}
      </View>
    </Wrapper>
  );
});

export default React.memo(Header);

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
  },
});
