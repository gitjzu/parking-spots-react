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
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          liteMode
        >
        </MapView>
        <Text style={styles.address}>Osoite</Text>
      </CardView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
  },
  address: {
    fontSize: 20,
    margin: 10,
  },
});
