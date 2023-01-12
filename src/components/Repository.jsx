import { FlatList, View, StyleSheet } from 'react-native';

//import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';
import ReviewListItem from './ReviewListItem';
import Text from './Text';
import useRepository from '../hooks/useRepository';

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
});

export const RepositoryContainer = ({ repository, onEndReached }) => {
  const repositoryNodes = repository 
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

  return(
    <>
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        keyExtractor={({ id }) => id}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        //  ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={() => <RepositoryItem item={repository} linkButton/>}
        renderItem={ReviewListItem}
      />
    </>
  );
};

const Repository = ({ id }) => {
  const { repository, loading, error, fetchMore } = useRepository(10, id);
  
  const onEndReached = () => {
    //console.log("On end reached!");
    fetchMore();
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

  return <RepositoryContainer repository={repository} onEndReached={onEndReached} />;
};

export default Repository;