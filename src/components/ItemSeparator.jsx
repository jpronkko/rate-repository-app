import { View } from 'react-native'; 

const styles = {
  separator: {
    height: 15,
    backgroundColor: 'transparent', // 'green'
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

export default ItemSeparator;