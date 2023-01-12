import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  input: {
    borderColor: theme.colors.inputFrame,
    borderRadius: 6,
    borderWidth: 3,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  inputError: {
    borderColor: theme.colors.error,
    borderRadius: 6,
    borderWidth: 3,
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  errorText: {
    marginTop: 5,
    color: theme.colors.error,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        style={showError ? styles.inputError : styles.input}
        value={field.value && String(field.value)}
        //value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;