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
import { 
  AdMobBanner,
} from 'react-native-admob'

import SpotList from './SpotList'
import { bannerAdUnitId } from '../configs/config'

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <SpotListWithData />
        <View style={{alignItems: 'center'}}>
          <AdMobBanner
            bannerSize="banner"
            adUnitID={bannerAdUnitId}
            testDeviceID="EMULATOR"
            didFailToReceiveAdWithError={this.bannerError} />
        </View>
      </View>
    )
  }

  bannerError = () => {
    console.error('error loading ad')
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
}`, { options: { notifyOnNetworkStatusChange: true } })(SpotList)
