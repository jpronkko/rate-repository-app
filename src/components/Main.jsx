import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import AppBar from './AppBar';
import MakeReview from './MakeReview';
import RepositoryList from './RepositoryList';
import RepositoryView from './RepositoryView';
import MyReviews from './MyReviews';
import SignIn from './SignIn';
import SignOut from './SignOut';
import SignUp from './SignUp';

const styles = StyleSheet.create({
  container: {
    //  marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {

  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/repoview/:id" element={<RepositoryView />} exact />
        <Route path="/myreviews" element={<MyReviews />} exact />
        <Route path="/review" element={<MakeReview />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/signout" element={<SignOut />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

// <Route path="/" element={<RepositoryList />} exact />
export default Main;


