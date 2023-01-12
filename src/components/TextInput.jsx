import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from './theme';

const styles = StyleSheet.create({
  input: {
    color: theme.colors.textPrimary,
    
  },
  inputError: {
    color: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    error ? styles.inputError : styles.input, 
    style];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
