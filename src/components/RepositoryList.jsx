import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

import Text from './Text';
import RepositoryListContainer from './RepositoryListContainer';
import useRepositories from '../hooks/useRepositories';

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

const RepositoryList = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword] = useDebounce(searchKeyword, 500);

  const [sortMethod, setSortMethod] = useState();
  const [orderBy, setOrderBy] = useState("CREATED_AT");
  const [orderDirection, setOrderDir] = useState("DESC");
  
  const { repositories, loading, error, fetchMore } = 
    useRepositories(10, orderBy, orderDirection, debouncedKeyword);

  const navigate = useNavigate();

  const onPress = (item) => {
    navigate(`/repoview/${item.id}`);
  };

  const onSortMethod = (sortValue) => {
    switch( sortValue ) {
    case "latest":
      setOrderDir("DESC");
      setOrderBy("CREATED_AT");
      break;
    case "highest":
      setOrderDir("DESC");
      setOrderBy("RATING_AVERAGE");
      break;
    case "lowest":
      setOrderDir("ASC");
      setOrderBy("RATING_AVERAGE");
      break;
    default:
      console.log("No such sorting value:", sortValue);
    } 

    setSortMethod(sortValue);
    //console.log("Repositories", repositories.edges.map(item => item.node.createdAt));
  };

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

  return (
    <RepositoryListContainer 
      repositories={repositories} 
      onPress={onPress} 
      onSortMethod={onSortMethod}
      sortMethod={sortMethod}
      onSearchKeyword={setSearchKeyword}
      searchKeyword={searchKeyword}
      onEndReached={onEndReached} />
  );
};

export default RepositoryList;