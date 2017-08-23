import React, { PureComponent } from 'react'
import { 
  View, 
  Text,
  Button,
} from 'react-native'
import MapView from 'react-native-maps'
import { Link } from 'react-router-native'
import Drawer from './Drawer'

export default class DetailedSpot extends PureComponent {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    const {
      address,
      coordinates,
      lat,
      lon,
    } = this.props.location.state.spot
    const {
      region,
    } = this.props.location.state.region
    return (
      <View style={{flex: 1}}>
        <Text>{address}</Text>
        
        <MapView 
              region={region}
              toolbarEnabled={false}
            >
          <MapView.Polyline 
            coordinates={coordinates}
            strokeWidth={5}
            strokeColor='#304ffe'
          />
        </MapView>

        <Button title='Navigoi tänne' onPress={() => console.log('test')} />
      </View>
    )
  }
}