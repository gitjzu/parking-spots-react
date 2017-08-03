import React, { Component } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import CardView from 'react-native-cardview'

export default class Spot extends Component {
  render() {
    return (
      <CardView style={styles.container}> 
        <MapView 
          style={styles.map}
          region={{
            latitude: this.props.lat,
            longitude: this.props.lon,
            latitudeDelta: 0.022457779374775423,
            longitudeDelta: 0.07127254085439123,
          }}
          liteMode
          showsUserLocation
        >
        </MapView>
        <Text style={styles.address}>
          {this.props.address}
        </Text>
      </CardView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  map: {
    height: 150
  },
  address: {
    fontSize: 20,
    margin: 10,
  },
});