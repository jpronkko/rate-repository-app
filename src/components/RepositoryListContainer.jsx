import React from 'react';
import { FlatList, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from "react-native-paper";

import ItemSeparator from './ItemSeparator';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  container:  {
    flexGrow: 1,
    backgroundColor: '#e1e4e8',
  },
});

const RepositoryListHeader = ({ 
  onSortMethod, 
  sortMethod, 
  onSearchKeyword, 
  searchKeyword,
}) => {
  return (
    <>
      <Searchbar
        placeholder='Filter'
        onChangeText={onSearchKeyword}
        value={searchKeyword}
      />
      <Picker 
        selectedValue={sortMethod}
        onValueChange={onSortMethod}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </>
  );
};

class RepositoryListContainer extends React.Component { 
  constructor() {
    super();
    this.repositoryNodes = this.repositoryNodes.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderItem = this.renderItem.bind(this);
  }  

  /*componentDidMount() {
    console.log("Comp mounted!");
  }
  
  componentWillUnmount() {
    console.log("Comp will unmount!");
  }*/
  
  renderHeader = () => <RepositoryListHeader 
    onSortMethod={(value) => this.props.onSortMethod(value)}
    sortMethod={this.props.sortMethod}   
    onSearchKeyword={(value) => this.props.onSearchKeyword(value)}
    searchKeyword={this.props.searchKeyword}
  />;
    
  renderItem = ({item}) => <RepositoryItem 
    item={item} 
    onPress={() => this.props.onPress(item)}
  />;

  itemSeparator = () => <ItemSeparator />;

  // keyExtractor={({ id }) => id}
  repositoryNodes = () => this.props.repositories 
    ? this.props.repositories.edges.map(edge => edge.node)
    : [];

  render(){
    return (
      <FlatList
        style={styles.container}
        data={this.repositoryNodes()}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
        keyExtractor={this.keyExtractor}
        ListHeaderComponent={this.renderHeader}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.itemSeparator}
      />
    );
  }
}

export default RepositoryListContainer;