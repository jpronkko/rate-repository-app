import { View, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from './Text';
import theme from './theme';

const styles = StyleSheet.create({
  button: { 
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: theme.fontSizes.subheading,
    color: theme.colors.appBarText,
    paddingLeft: 5,
    paddingBottom: 3,
  }
});
  
const AppBarButton = ({title, linkTarget}) => {
  return (
    <View style={styles.button}>
      <Link to={linkTarget}>
        <Text style={styles.title}>{title}</Text>
      </Link>
    </View>
  );
};

export default AppBarButton;