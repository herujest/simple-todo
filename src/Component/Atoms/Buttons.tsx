import React from 'react';
import {TouchableOpacity, StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Text from './Text';

interface ButtonProps {
  type: 'primary' | 'primaryInactive' | 'secondary' | 'secondaryInactive';
  title: string;
  onPress?: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({type, title, onPress, disabled}) => {
  const buttonStyles = getButtonStyle(type);
  return (
    <TouchableOpacity
      style={[
        styles.button,
        buttonStyles.container,
        disabled && buttonStyles.inactiveContainer,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        variant="buttonText1"
        style={[
          styles.text,
          buttonStyles.text,
          disabled && buttonStyles.inactiveText,
        ]}>
        {title}
      </Text>
      <Text style={[styles.arrow, buttonStyles.text]}>{'→'}</Text>
    </TouchableOpacity>
  );
};

const getButtonStyle = (type: ButtonProps['type']) => {
  switch (type) {
    case 'primary':
      return {
        container: styles.primaryButton,
        text: styles.primaryText,
        inactiveContainer: styles.primaryInactiveButton,
        inactiveText: styles.primaryInactiveText,
      };
    case 'secondary':
      return {
        container: styles.secondaryButton,
        text: styles.secondaryText,
        inactiveContainer: styles.secondaryInactiveButton,
        inactiveText: styles.secondaryInactiveText,
      };
    default:
      return {
        container: styles.primaryInactiveButton,
        text: styles.primaryInactiveText,
        inactiveContainer: styles.secondaryInactiveButton,
        inactiveText: styles.secondaryInactiveText,
      };
  }
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginBottom: 16,
  } as ViewStyle,
  text: {
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  } as TextStyle,
  arrow: {
    fontFamily: 'Noto Sans',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  } as TextStyle,

  // Primary Button
  primaryButton: {
    backgroundColor: '#585CE5',
  } as ViewStyle,
  primaryText: {
    color: '#FFFFFF',
  } as TextStyle,
  primaryInactiveButton: {
    backgroundColor: '#C7C7DB',
  } as ViewStyle,
  primaryInactiveText: {
    color: '#F4F4F4',
  } as TextStyle,

  // Secondary Button
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#585CE5',
  } as ViewStyle,
  secondaryText: {
    color: '#585CE5',
  } as TextStyle,
  secondaryInactiveButton: {
    borderWidth: 2,
    borderColor: '#C7C7DB',
  } as ViewStyle,
  secondaryInactiveText: {
    color: '#C7C7DB',
  } as TextStyle,
});

export default Button;
