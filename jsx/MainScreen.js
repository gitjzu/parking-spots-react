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
import Permissions from 'react-native-permissions'

import I18n from './i18n/i18n'
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
      showSnackbar: false,
      snackOffset: 0,
      snackMessage: null,
      permissionToUseLocation: 'undetermined',
    } 
  }

  componentDidMount() {
    this.locate()
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
            onClickAction={this.locate} 
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
            didFailToReceiveAdWithError={this.bannerError} />
        </View>
      </View>
    )
  }

  bannerError = (err) => {
    console.log('error loading ad: ' + err)
  }

  locate = () => {
    this.checkLocationPermission()

    switch(this.state.permissionToUseLocation) {
      case 'authorized':
        this.getPosition()
        return


      case 'undetermined':
      case 'denied':
        this.requestLocationPermission()
        return

      case 'restricted':
        this.showToast(I18n.t('locationRestricted'))
        return
    }
  }

  getPosition = () => {
    this.setState({showSnackbar: true, snackMessage: I18n.t('locating')})

    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          userLatitude: position.coords.latitude,
          userLongitude: position.coords.longitude,
          error: null,
          showSnackbar: false
        })
        this.showToast(I18n.t('locatingSuccessfull'))
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

  requestLocationPermission = () => {
    Permissions.request('location') 
    .then(response => {
      if(response === 'authorized') this.getPosition()
      this.setState({ permissionToUseLocation: response })
    });
  }

  checkLocationPermission = () => {
    Permissions.check('location') 
      .then(response => {
        this.setState({ permissionToUseLocation: response })
      });
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