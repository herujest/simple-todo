import React from 'react';
import {Text as RNText, TextStyle, StyleSheet} from 'react-native';
import {useTheme} from '../../Context/ThemeContext';

interface TypographyProps {
  variant?:
    | 'headline1'
    | 'headline2'
    | 'headline3'
    | 'bodyText1'
    | 'bodyText1Bold'
    | 'bodyText2'
    | 'bodyText2Bold'
    | 'bodyText3'
    | 'bodyText3Bold'
    | 'buttonText1'
    | 'buttonText2'
    | 'percentages';
  style?: TextStyle;
  children: React.ReactNode;
}

const typographyStyles = StyleSheet.create({
  headline1: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 30,
    letterSpacing: 0.002,
    lineHeight: 39,
    marginBottom: 2,
  },
  headline2: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 20,
    letterSpacing: 0.012,
    lineHeight: 26,
    marginBottom: 2,
  },
  headline3: {
    fontFamily: 'NotoSans-Bold',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    marginBottom: 2,
  },
  bodyText1: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 16,
    letterSpacing: 0.012,
    lineHeight: 24,
    marginBottom: 2,
  },
  bodyText1Bold: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 16,
    letterSpacing: 0.012,
    lineHeight: 24,
    marginBottom: 2,
  },
  bodyText2: {
    fontFamily: 'NotoSans-Reguler',
    fontSize: 14,
    letterSpacing: 0.012,
    lineHeight: 21,
    marginBottom: 2,
  },
  bodyText2Bold: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 14,
    letterSpacing: 0.012,
    lineHeight: 21,
    marginBottom: 2,
  },
  bodyText3: {
    fontFamily: 'NotoSans-Regular',
    fontSize: 12,
    letterSpacing: 0.012,
    lineHeight: 18,
    marginBottom: 2,
  },
  bodyText3Bold: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 12,
    letterSpacing: 0.012,
    lineHeight: 18,
    marginBottom: 2,
  },
  buttonText1: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 16,
    letterSpacing: 0.012,
    lineHeight: 24,
    marginBottom: 2,
  },
  buttonText2: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 12,
    letterSpacing: 0.012,
    lineHeight: 18,
    marginBottom: 2,
  },
  percentages: {
    fontFamily: 'NotoSans-SemiBold',
    fontSize: 10,
    letterSpacing: 0.002,
    lineHeight: 10,
    marginBottom: 0,
  },
});

const Text: React.FC<TypographyProps> = React.memo(
  ({variant = 'bodyText1', style, children}) => {
    const {colors} = useTheme();

    return (
      <RNText
        style={[typographyStyles[variant], {color: colors.basic5}, style]}>
        {children}
      </RNText>
    );
  },
);

export default Text;
