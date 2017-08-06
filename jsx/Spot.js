import React, { PureComponent } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import CardView from 'react-native-cardview'

import { regionFrom } from './util'

export default class Spot extends PureComponent {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    let parsedCoordinates = parseCoordinates(this.props.coordinates)
    let region
    if (Array.isArray(this.props.coordinates[0])) {
      region = regionFrom(this.props.coordinates[0][1], this.props.coordinates[0][0])
    } else {
      region = regionFrom(this.props.coordinates[1], this.props.coordinates[0])
    }

    this.setState({
      coords: parsedCoordinates,
      region
    })
  }

  render() {
    return (
      <CardView style={styles.container}>
        {this.state.region && 
          <MapView 
            style={styles.map}
            region={this.state.region}
            liteMode={true}
          >
            <MapView.Polyline 
              coordinates={this.state.coords}
              strokeWidth={5}
              strokeColor='#304ffe'
            />
          </MapView>
        }
        <Text style={styles.address}>
          {this.props.address}
        </Text>
      </CardView>
    )
  }
}

const parseCoordinates = (coordinates) => {
  const coords = []
    coordinates.forEach((coordinatePair) => {
      coords.push({
        latitude: coordinatePair[1],
        longitude: coordinatePair[0]
      })
    })
  return coords
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