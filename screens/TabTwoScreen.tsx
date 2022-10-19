import { FlatList, Image, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useQuery, gql, useMutation } from "@apollo/client";
import RoundedButton from '../components/RoundedButton';
import Coin from '../components/Coin';
import Navigation from '../navigation';

// Queries
const FETCH_FAVORITES = gql`
  query {
    favorites {
      name
      price
      symbol
      imageUrl
      favorite
    }
  }
`;

// Mutations
const ADD_COIN = gql`
  mutation AddCoin($symbol: String!) {
    addCoin(symbol: $symbol) {
      name
      symbol
      price
      imageUrl
      favorite
    }
  }
`;

const REMOVE_COIN = gql`
  mutation RemoveCoin($symbol: String!) {
    removeCoin(symbol: $symbol) {
      name
      symbol
      price
      imageUrl
      favorite
    }
  }
`;

export default function TabTwoScreen({ navigation, route }) {
  const { params } = route;
  const { coin } = params;
  const { symbol, name, price, imageUrl } = coin;
  const { data, refetch } = useQuery(FETCH_FAVORITES);
  const [addCoin] = useMutation(ADD_COIN);
  const [removeCoin] = useMutation(REMOVE_COIN);

  const isFavorite =
    data &&
    data.favorites &&
    data.favorites.find(coin => coin.symbol === symbol);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.image} source={{ uri: imageUrl }} />
        <Text style={styles.text} numberOfLines={1}>
          {" "}
          {name} - {symbol}{" "}
        </Text>
        <RoundedButton
          backgroundColor="skyblue"
          text={isFavorite ? `Remove ${symbol}` : `Save ${symbol}`}
          onPress={() => {
            if (isFavorite) {
              removeCoin({
                variables: { symbol: symbol },
              })
                .then(() => refetch())
                .catch(err => console.log("FAIO", err));
            } else {
              addCoin({
                variables: { symbol: symbol },
              })
                .then(() => refetch())
                .catch(err => console.log("SUCCESS", err));
            }
          }}
        />
      </View>
      <View style={styles.statsRow}>
        <Text style={styles.text}>Price</Text>
        <Text style={styles.text}>{price}</Text>
      </View>

      <View style={styles.favContainer}>
        {!!data && !!data.favorites && (
          <FlatList
            data={data.favorites}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item, index }) => (
              <Coin
                coin={item}
                onPress={() => navigation.navigate("TabTwo", { coin: item })}
              />
            )}
          />
        )}
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
  favContainer: {
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
  },
});
