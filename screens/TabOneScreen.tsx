import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import Coin from '../components/Coin';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { useQuery, gql } from "@apollo/client";

const COINS_QUERY = gql`
  query Coins($offset: Int, $limit: Int) {
    coins(offset: $offset, limit: $limit) {
      name
      symbol
      favorite
      price
    }
  }
`;


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const {data, fetchMore, error } = useQuery(COINS_QUERY, {
    variables: {
      offset: 0,
      limit: 10
    },
    fetchPolicy: 'cache-and-network'
  });

  if(!data || !data.coins){
    console.log('ERRO', error);
    return <ActivityIndicator style={{ ...StyleSheet.absoluteFillObject}} />
  } 

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        data={data.coins}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ item, index }) => (
          <Coin
            coin={item}
            onPress={() => navigation.navigate("TabTwo", { coin: item })}
          />
        )}
        onEndReachedThreshold={0.9}
        onEndReached={() => {
          fetchMore({
            variables: {
              offset: data.coins.length
            },
            updateQuery(previousQueryResult, options) {              
              // console.log("prev", previousQueryResult);
              // console.log('opt', options);
              
              if(!options.fetchMoreResult) return previousQueryResult;
              return Object.assign({}, previousQueryResult, {
                coins: [
                  ...previousQueryResult.coins,
                  ...options.fetchMoreResult.coins,
                ],
              });
            },
          })
        }}
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
