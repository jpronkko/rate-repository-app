import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useApolloClient } from '@apollo/client';

import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  container:  {
    flexGrow: 1,
    backgroundColor: '#e1e4e8',
  },
  messageContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
  },
});

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = () => {
    console.log("Signing out!");
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate("/");
  };

  const cancel = () => {
    console.log("Cancel!");
    navigate("/");
  };

  return (
    <View style={styles.messageContainer}>
      <Text fontSize="subheading" fontweight="bold" style={{padding: 15}}>Really sign out?</Text>
      <View style={{flexDirection: "row"}}>
        <TouchableOpacity style={styles.button} onPress={signOut}>
          <Text fontWeight='bold' style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => cancel()}>
          <Text fontWeight='bold' style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignOut;