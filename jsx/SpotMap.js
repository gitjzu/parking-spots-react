import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps'

export default class SpotMap extends Component {
  constructor() {
    super() 

    this.state = {
      region: null,
      coordinates: null,
    }
  } 

  render() {
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.container}
          showsUserLocation
          toolbarEnabled={false}
        >
          
        </MapView>
      </View>
    )
  }

  componentDidMount() {

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Icon: {
    color: '#FFFFFF',
    fontSize: 50,
  },
})
