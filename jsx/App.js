import React, { Component } from 'react'
import { 
  View, 
  Text,
  Button,
  StyleSheet,
  DrawerLayoutAndroid
} from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import SpotList from './SpotList'
import Drawer from './Drawer'

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Drawer>
          <SpotListWithData />
        </Drawer>
      </View>
    )
  }
}

const SpotListWithData = graphql(gql`{
  allSpots {
    id
    spot_name
    lat
    lon
    coordinates{
      latitude
      longitude
    }
  }
}`, { options: { notifyOnNetworkStatusChange: true } })(SpotList);
