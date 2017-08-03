import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Text } from 'react-native'
import Spot from './Spot'

export default class SpotList extends Component {

  constructor() {
    super()
    this.state = {
      userLatitude: null,
      userLongitude: null,
      error: null,
      locationList: [
        {address: 'OSOITE a'}, 
        {address: 'OSOITE b'}, 
        {address: 'OSOITE c'}, 
        {address: 'OSOITE d'},
        {address: 'OSOITE e'}, 
        {address: 'OSOITE f'}, 
        {address: 'OSOITE g'}, 
        {address: 'OSOITE h'},
        {address: 'OSOITE i'}, 
        {address: 'OSOITE j'}, 
        {address: 'OSOITE k'}, 
        {address: 'OSOITE l'},
        {address: 'OSOITE m'}, 
        {address: 'OSOITE n'}, 
        {address: 'OSOITE o'}, 
        {address: 'OSOITE p'},
      ]
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
        {this.state.userLatitude && 
          <FlatList style={styles.container}
            data={this.state.locationList} 
            keyExtractor={item => item.address}
            renderItem={({item}) => {
              return (
                <Spot 
                  address={item.address} 
                  lat={this.state.userLatitude}
                  lon={this.state.userLongitude}
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
