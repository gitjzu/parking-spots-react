import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  FlatList,
} from 'react-native'

import Spot from './Spot'

export default class SpotList extends Component {
  render() {
    return (
      <View style={styles.container}>
          { // Display ActivityIndicator if data is loading and network status is NOT 3 (=fetchMore in flight)
            // If network status is 3 we display the ActivityIndicator on the FlatList footer instead of here
            this.props.loading && this.props.networkStatus !== 3 ? 
          <ActivityIndicator size='large'/>
          :
          <FlatList 
            style={styles.container}
            data={this.props.Spots} 
            keyExtractor={item => item.id}
            initialNumToRender={10}
            refreshing={this.props.networkStatus === 4}
            onRefresh={this.props.refetch}
            onEndReachedThreshold={0.5}
            onEndReached={this.loadMore}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false}}
            renderItem={this.renderSpot}
            ListFooterComponent={this.renderFooter}
          />
          }
      </View>
    )
  }

  renderSpot = ({item}) => (
    <Spot 
      address={item.spot_name} 
      coordinates={item.coordinates}
      lat={item.lat}
      lon={item.lon}
      type={item.type}
      distance={item.distance}
    />
  )
  renderFooter = () => {    
    return (
      <View style={styles.loadingContainer}>
        { //networkstatus 3 = fetchMore is in flight
          this.props.loading && this.props.networkStatus === 3 &&
          <ActivityIndicator size='large' />          
        }
      </View>
    )
  }

  loadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.props.loadMoreEntries()
      this.onEndReachedCalledDuringMomentum = true
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    height: 36,
  }
})
