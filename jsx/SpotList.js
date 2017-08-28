import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'

import Spot from './Spot'

export default class SpotList extends Component {
  render() {
    return (
      <View style={styles.container}>
          {this.props.data.loading ? 
          <ActivityIndicator/>
          :
          <OptimizedFlatList style={styles.container}
            data={this.props.data.Spots} 
            keyExtractor={item => item.id}
            initialNumToRender={10}
            refreshing={this.props.data.networkStatus === 4}
            onRefresh={this.props.data.refetch}
            renderItem={({item}) => {
              return (
                <Spot 
                  address={item.spot_name} 
                  coordinates={item.coordinates}
                  lat={item.lat}
                  lon={item.lon}
                  distance={item.distance}
                />
                )
              }}
          />
          }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
