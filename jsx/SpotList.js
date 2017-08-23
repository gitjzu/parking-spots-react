import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import Spot from './Spot'

export default class SpotList extends Component {

  constructor() {
    super()

    this.state = {
      userLatitude: null,
      userLongitude: null,
      error: null
    } 
  }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          latitude: 
          {this.state.userLatitude}
        </Text>
          {this.props.data.loading ? 
          <ActivityIndicator/>
          :
          <OptimizedFlatList style={styles.container}
            data={this.props.data.allSpots} 
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
                  userLat={this.state.userLatitude}
                  userLon={this.state.userLongitude}
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
});
