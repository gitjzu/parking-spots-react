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
          initialRegion={this.state.region}
          toolbarEnabled={false}
        >
          { this.state.coordinates && this.state.coordinates.length === 1 ?
            <MapView.Marker
              coordinate={this.state.coordinates[0]}
              pinColor='#304ffe'
            />
            :
            <MapView.Polyline 
              coordinates={this.state.coordinates}
              strokeWidth={5}
              strokeColor='#304ffe'
            />
          }
        </MapView>
      </View>
    )
  }

  componentDidMount() {
    this.setState({
      region: this.props.location.state.region,
      coordinates: this.props.location.state.coordinates,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
