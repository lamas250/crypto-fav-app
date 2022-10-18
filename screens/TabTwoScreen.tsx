import { Image, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen({ route }) {
  const { params } = route;
  const {coin} = params;
  const {symbol, name, price, imageUrl} = coin;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.text} numberOfLines={1}>
          {" "}
          {name} - {symbol}{" "}
        </Text>
      </View>
      <View style={styles.statsContainer}>
        <ScrollView>
          <View style={styles.statsRow}>
            <Text style={styles.text}>Price</Text>
            <Text style={styles.text}>{price}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 32,
    color: '#161616'
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover'
  },
  statsContainer: {
    flex: 62,
    backgroundColor: '#161616',
  },
  statsRow: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  stats: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500'
  }
});
