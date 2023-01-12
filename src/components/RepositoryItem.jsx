import { Image, View, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native';
import * as Linking from 'expo-linking';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  descriptionText: {
    paddingTop: 5, 
    paddingBottom: 7,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  languageTag: {
    borderRadius: 5,
    fontWeight: 'bold',
    backgroundColor: theme.colors.primary,
    flexGrow: 0,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  languageTagText: {
    flexGrow: 0,
    color: 'white',
    paddingVertical: 5,
    paddingHorizontal: 7,   
  },
  linkButton: {
    margin: 7,
    borderRadius: 5,
    backgroundColor: theme.colors.buttonColor,
    alignItems: 'center',
    alignContent: 'center',
  },
  linkButtonText: {
    padding: 15,
    color: theme.colors.buttonText,
  },
  logo: {
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: 5,
  },
  renderItem: { 
    backgroundColor: 'white', 
    padding: 5 
  },
  stats: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
  },
  statsItem: {
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  textItem: {
    flexGrow: 1, 
    flexShrink: 1, 
    padding: 10, 
  },
});

const StatsItem = ({info}) => {
  const numToString = (val) => {
    return val > 1000 ? (val/1000).toFixed(1) + 'k' : val;
  };

  return(
    <View style={ styles.stats }>
      <View style={ styles.statsItem }>
        <Text fontWeight='bold'>{numToString(info.stargazersCount)}</Text>
        <Text color='textSecondary'>Stars</Text>
      </View>
      <View style={ styles.statsItem }>
        <Text fontWeight='bold'>{numToString(info.forksCount)}</Text>
        <Text color='textSecondary'>Forks</Text>
      </View>
      <View style={ styles.statsItem }>
        <Text fontWeight='bold'>{numToString(info.reviewCount)}</Text>
        <Text color='textSecondary'>Reviews</Text>
      </View>
      <View  style={ styles.statsItem }>
        <Text fontWeight='bold'>{numToString(info.ratingAverage)}</Text>
        <Text color='textSecondary'>Rating</Text>
      </View>
    </View>
  );
};
  
const TextItem = ({item}) => {
  return (
    <View style={styles.textItem}>
      <Text fontSize='subheading' fontWeight='bold'>{item.fullName}</Text>
      <Text color='textSecondary' style={styles.descriptionText}>{item.description}</Text>
      <View style={ styles.languageTag }>
        <Text style={styles.languageTagText}>{item.language}</Text>
      </View>
    </View> 
  );
};

const RepositoryItem = ({item, onPress, linkButton}) => {
  const showLinkButton = () => {
    return (
      <TouchableOpacity style={styles.linkButton} onPress={() => Linking.openURL(item.url)}>
        <Text fontWeight='bold' style={styles.linkButtonText}>
          Open in GitHub
        </Text>
      </TouchableOpacity>
    );
  };

  return(
    <TouchableHighlight 
      key={item.key} 
      onPress={onPress}>
      <View testID='repositoryItem' style={styles.renderItem}>
        <View style={{ flexGrow: 1, flexDirection: 'row' }}>
          <Image 
            style={styles.logo}
            source={{ uri: item.ownerAvatarUrl }}
          />
          <TextItem item={item} />
        </View>   
        <StatsItem info={item} /> 
        {linkButton && showLinkButton()}
      </View>
    </TouchableHighlight>
  );
};

export default RepositoryItem;