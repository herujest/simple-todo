import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  KeyboardAvoidingView,
} from 'react-native';
import Text from '../Atoms/Text';
import {useTheme} from '../../Context/ThemeContext';

interface StackedLabelInputProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean; // Conditionally style for error
  success?: boolean; // Conditionally style for success
  placeholder?: string;
  secureTextEntry?: boolean; // Optional: for password inputs
  style?: object; // Custom styles
}

const StackedLabelInput: React.FC<StackedLabelInputProps> = ({
  label,
  value,
  onChangeText,
  error = false,
  success = false,
  placeholder,
  secureTextEntry = false,
  style,
  ...props
}) => {
  const {colors} = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const inputStyles = [
    styles.input,
    {color: colors.basic4},
    isFocused && {
      borderColor: colors.color2, // Border color when focused
    },
    error && styles.error,
    success && styles.success,
    style, // Apply custom styles if provided
  ];

  return (
    <KeyboardAvoidingView>
      <View style={styles.container}>
        <Text
          variant="headline3"
          style={[styles.label, {color: colors.basic4}]}>
          {label}
        </Text>
        <TextInput
          style={inputStyles}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={colors.basic4}
          {...props}
        />
        {error && (
          <Text style={styles.errorMessage}>This field is required.</Text>
        )}
        {success && <Text style={styles.successMessage}>Looks good!</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 4,
  },
  labelFocused: {
    color: '#585CE5', // Color when focused
  },
  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0', // Default border color
    borderRadius: 15,
    padding: 10,
    paddingBottom: 15,
    backgroundColor: '#FAFAFF', // Background color
    fontFamily: 'NotoSans-Reguler',
    fontSize: 14,
    letterSpacing: 0.012,
    lineHeight: 21,
    marginBottom: 2,
    textAlignVertical: 'center',
  },
  error: {
    borderColor: '#FF4D4D', // Border color when error
  },
  success: {
    borderColor: '#4CAF50', // Border color when success
  },
  errorMessage: {
    color: '#FF4D4D',
    marginTop: 4,
    fontSize: 12,
  },
  successMessage: {
    color: '#4CAF50',
    marginTop: 4,
    fontSize: 12,
  },
});

export default StackedLabelInput;
