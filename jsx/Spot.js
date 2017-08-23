import React, { Component } from 'react'
import { 
  View, 
  Text, 
  Button, 
  StyleSheet
} from 'react-native'
import MapView from 'react-native-maps'
import { Link } from 'react-router-native'
import CardView from 'react-native-cardview'

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
      <Link to={{
        pathname: '/spot',
        state: {spot: this.props, region: this.state.region},
        }} >
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
              {userLat && userLon &&
                <Text style={{marginRight: 10}}>
                  ({distance(lat, lon, userLat, userLon).toFixed(1)}km)
                </Text>
              }
              <Button title='Navigoi tänne' onPress={() => console.log('test')} />
            </View>
          </View>
        </CardView>
      </Link>
    )
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
});