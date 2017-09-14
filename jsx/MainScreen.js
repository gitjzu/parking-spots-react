import React, { Component } from 'react'
import { 
  View, 
  Text,
  Button,
  StyleSheet,
  DrawerLayoutAndroid,
  ToastAndroid,
  NativeModules,
} from 'react-native'
import { graphql } from 'react-apollo'
import { 
  AdMobBanner,
} from 'react-native-admob'
import { Link } from 'react-router-native'
import SnackBar from 'react-native-snackbar-component'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialIcons'

import SpotList from './SpotList'
import { bannerAdUnitId } from '../configs/config'
import { allSpotsQuery } from './queries'

export default class MainScreen extends Component {
  constructor() {
    super()

    this.state = {
      userLatitude: null,
      userLongitude: null,
      error: null,
      showSnackbar: true,
      snackOffset: 0,
      snackMessage: null,
    } 
  }

  componentDidMount() {
    this.getPosition()
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <SpotListWithData
            userLat={this.state.userLatitude}
            userLon={this.state.userLongitude}
          />

          <FAB 
            buttonColor="red" 
            iconTextColor="#FFFFFF" 
            onClickAction={this.getPosition} 
            visible={true} 
            iconTextComponent={<Icon name="gps-fixed"/>} 
            snackOffset={this.state.snackOffset}
          />

          <SnackBar 
            visible={this.state.showSnackbar} 
            textMessage={this.state.snackMessage}
            distanceCallback={(distance)=>{this.setState({snackOffset: distance})}}
          />
        </View>

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

  getPosition = () => {
    this.setState({showSnackbar: true, snackMessage: 'Trying to get location...'})

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
          showSnackbar: false
        })
        this.showToast('Location retrieved succesfully')
      },
      (error) => {
        this.setState({
        error: error.message, 
        showSnackbar: false,
        })
        this.showToast(error.message)
      },
      { timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
      // There seems to be a bug where setting "enableHighAccuracy: true" will not return a position, instead the request will just timeout -Yacine
    )
  }

  showToast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  }
}

const SpotListWithData = graphql(allSpotsQuery, {
  options: ({userLat, userLon}) => ({
    variables: {
      userLat,
      userLon,
    },
  }),
  notifyOnNetworkStatusChange: true,
}) (SpotList)