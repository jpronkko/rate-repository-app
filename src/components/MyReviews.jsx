import { Alert, FlatList, StyleSheet, View } from "react-native";

import ReviewListItem from "./ReviewListItem";
import useReviews from "../hooks/useReviews";
import useDeleteReview from '../hooks/useDeleteReview';
import Message from "./Message";
import Text from "./Text";

const styles = StyleSheet.create({
  container:  {
    flexGrow: 1,
    backgroundColor: '#e1e4e8',
    //height: "90%",
    paddingBottom: 100,
  },
  messageContainer: {
    flexGrow: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const MyReviews = () => {
  const { reviews, error, loading, refetch } = useReviews();
  const [deleteReview] = useDeleteReview();

  const reviewNodes = reviews ? reviews : [];

  const onDelete = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete the review?",
      [
        { 
          text: "Cancel",
          onPress: () => console.log('Cancel'),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => deleteReviewWithId(id)
        }
      ]
    );
  };

  const deleteReviewWithId = async (id) => {
    try {
      const result = await deleteReview(id);
      console.log("Delete result:", result);
      await refetch();
    } catch (e) {
      console.log("Exception: ", e);
      Message("Error", e.toString());
      await refetch();
    }
  };

  if(loading) {
    return (
      <View style={styles.messageContainer}>
        <Text fontSize='subheading' fontWeight='bold'>Loading...</Text>
      </View>
    );
  }

  if(error) {
    return (
      <View style={styles.messageContainer}> 
        <Text fontSize='subheading' fontWeight='bold'>Error: {error.toString()}.</Text>
      </View>
    );
  }

  if(reviewNodes.length === 0) {
    return(
      <View style={styles.messageContainer}>
        <Text fontSize="subheading" fontWeight="bold">No reviews yet!</Text>
      </View>
    );
  }
  return(
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        data={reviewNodes}
        keyExtractor={({ id }) => id}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <ReviewListItem item={item} onDelete={onDelete} isMyItem/>}
      />
    </View>
  );
};

export default MyReviews;