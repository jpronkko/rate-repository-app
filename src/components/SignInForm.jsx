import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from './theme';

const styles = StyleSheet.create({
  form: {
    padding: 7,
  },
  button: {
    margin: 7,
    borderRadius: 5,
    backgroundColor: theme.colors.buttonColor,
    alignItems: 'center',
    alignContent: 'center',
  },
  buttonText: {
    padding: 15,
    color: theme.colors.buttonText,
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />      
      <FormikTextInput secureTextEntry name="password" placeholder="Password" />      
      <View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text fontWeight='bold' style={styles.buttonText}>Sign in</Text>
        </TouchableOpacity>
      </View>          
    </View>
  );
};

export default SignInForm;
  