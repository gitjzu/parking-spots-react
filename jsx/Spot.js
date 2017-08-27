import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Button, 
  StyleSheet
} from 'react-native'
import MapView from 'react-native-maps'
import CardView from 'react-native-cardview'
import getDirections from 'react-native-google-maps-directions'

import { regionFrom, distance } from './util'

export default class Spot extends Component {
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
    const {
      userLat,
      userLon,
      lat,
      lon,
      coordinates,
      address
    } = this.props


    return (
      <CardView style={styles.container}>
        {this.state.region && 
          <MapView 
            style={styles.map}
            region={this.state.region}
            liteMode={true}
            toolbarEnabled={false}
          >
            <MapView.Polyline 
              coordinates={coordinates}
              strokeWidth={5}
              strokeColor='#304ffe'
            />
          </MapView>
        }
        <View style={styles.cardBottom} >
          <Text style={styles.address}>
            {address}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{marginRight: 10}}>
            {userLat ?
              <Text>
              ({distance(lat, lon, userLat, userLon).toFixed(1)} km)
              </Text>
              :
              <Text>
              -- km
              </Text>
            }
            </Text>
            <Button title='Navigoi tänne' onPress={this.navigate} />
          </View>
        </View>
      </CardView>
    )
  }

  navigate = () => {
    const data = {
      destination: {
        latitude: this.props.lat,
        longitude: this.props.lon,
      },
      params: []
    }
    getDirections(data)
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 5,
  },
  cardBottom: {
    flexDirection: 'row', 
    flex: 1, 
    marginBottom: 8, 
    marginRight: 8, 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  map: {
    height: 150
  },
  address: {
    fontSize: 20,
    margin: 10,
  },
})