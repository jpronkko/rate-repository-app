import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from './theme';
import useSignInCheck from '../hooks/useSignInCheck';
import AppBarButton from './AppBarButton';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: theme.colors.appBarBackground,
    paddingBottom: 10,
    paddingLeft: 10,
  },
});

const AppBar = () => {
  const {result: isSignedIn, error} = useSignInCheck();
  console.log("Is signed in:", isSignedIn, "error:", error);
  
  const signButton = () => {
    if (isSignedIn) {
      return(
        <>
          <AppBarButton title="Create Review" linkTarget="/review"/>
          <AppBarButton title="My reviews" linkTarget="/myreviews" />
          <AppBarButton title="Sign out" linkTarget="/signout"/>
        </>
      );
    } else { 
      return (
        <>
          <AppBarButton title="Sign up" linkTarget="/signup"/>
          <AppBarButton title="Sign in" linkTarget="/signin"/>
        </>
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarButton title="Repositories" linkTarget="/"/>
        {signButton()}
      </ScrollView>
    </View>
  );
};

export default AppBar;