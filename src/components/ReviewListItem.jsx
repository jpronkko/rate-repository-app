import { View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import { format } from 'date-fns';

import Text from './Text';
import theme from './theme';

const ratingWidth = 55;

const styles = StyleSheet.create({
  deleteButton: {
    margin: 7,
    borderRadius: 5,
    backgroundColor: theme.colors.alertButtonColor,
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  deleteButtonText: {
    padding: 15,
    color: theme.colors.buttonText,
  },
  linkButton: {
    margin: 7,
    borderRadius: 5,
    backgroundColor: theme.colors.buttonColor,
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  linkButtonText: {
    padding: 15,
    color: theme.colors.buttonText,
  },
  ratingCont: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  ratingSphere: {
    borderColor: '#0386b0',
    borderRadius: ratingWidth/2,
    borderWidth: 3,
    marginTop: 5,
    width: ratingWidth,
    height: ratingWidth,
    justifyContent: 'center',
  },
  ratingText: {
    fontSize: 18,
    color: '#0376b0',
    padding: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  reviewContainer: {
    backgroundColor: 'white',
    marginTop: 10,
    flexDirection: 'column',
    //flexGrow: 1,
    //flex: 1,
  },
  reviewContainer2: {
    flexDirection: 'row',
    flex: 1,
  },
  repoTextCont: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  separator: {
    height: 15,
    backgroundColor: 'transparent',
  },
});

const ReviewListItem = ({item, isMyItem, onDelete}) => {
  const renderHeading = () => {
    if (isMyItem) {
      return (
        <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
      );
    }
    return (
      <Text fontSize='subheading' fontWeight='bold'>{item.user.username}</Text>
    );
  };

  const renderButtons = () => {
    if (isMyItem) {
      return (
        <View style={styles.reviewContainer2}>
          <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(item.url)}>
            <Text fontWeight='bold' style={styles.linkButtonText}>
              Open in GitHub
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={()=> onDelete(item.id)}>
            <Text fontWeight='bold' style={styles.linkButtonText}>
              Delete
            </Text>
          </TouchableOpacity>     
        </View>
      );
    }
  };

  return(
    <View style={styles.reviewContainer}>
      <View style={styles.reviewContainer2}>
        <View style={styles.ratingCont}>
          <View style={styles.ratingSphere}>
            <Text fontWeight='bold' style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
        <View style={styles.repoTextCont}>
          {renderHeading()}
          <Text fontSize='subheading' color='textSecondary' style={{marginVertical: 2}}>
            {format(new Date(item.createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text>{item.text}</Text>
        
        </View>
      
      </View>
      {renderButtons()}
    </View>
  );
};

export default ReviewListItem;