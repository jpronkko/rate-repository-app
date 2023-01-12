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

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="ownerName" placeholder="Reposity owner name" />      
      <FormikTextInput name="repositoryName" placeholder="Repository name" /> 
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" keyboardType="numeric"/> 
      <FormikTextInput name="text" placeholder="Review" multiline/> 
      <View>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text fontWeight='bold' style={styles.buttonText}>Create a review</Text>
        </TouchableOpacity>
      </View>          
    </View>
  );
};

export default ReviewForm;
  