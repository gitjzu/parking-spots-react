import React, { PureComponent } from 'react'
import { 
  View, 
  Text, 
  Button, 
  StyleSheet
} from 'react-native'
import MapView from 'react-native-maps'
import CardView from 'react-native-cardview'

import { regionFrom } from './util'

export default class Spot extends PureComponent {
  constructor() {
    super()

    this.state = {}
  }

  componentDidMount() {
    region = regionFrom(this.props.lat, this.props.lon)

    this.setState({
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
              coordinates={this.props.coordinates}
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