import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  FlatList,
  Text
} from 'react-native'
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
          <FlatList style={styles.container}
            data={this.props.data.allSpots} 
            keyExtractor={item => item.id}
            refreshing={this.props.data.networkStatus === 4}
            onRefresh={this.props.data.refetch}
            renderItem={({item}) => {
              return (
                <Spot 
                  address={item.spot_name} 
                  coordinates={item.coordinates}
                  lat={item.lat}
                  lon={item.lon}
                />
                )
              }}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
