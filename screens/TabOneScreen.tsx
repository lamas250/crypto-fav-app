import { FlatList, StyleSheet } from 'react-native';
import Coin from '../components/Coin';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

const coins = [
  {
    'id': 1,
    "name": "Bitcoin",
    'symbol': 'BTC',
    'price': '$1,012',
    'imageUrl': ''
  },
  {
    "id": 2,
    "name": "Ethereum",
    "symbol": 'ETH',
    "price": '$186',
    "imageUrl": ''
  }
]


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={coins}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <Coin
            coin={item}
            onPress={() => navigation.navigate("TabTwo", { coin: item })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#161616',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 85
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
