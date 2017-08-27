import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native'
import { OptimizedFlatList } from 'react-native-optimized-flatlist'
import SnackBar from 'react-native-snackbar-component'
import FAB from 'react-native-fab'
import Icon from 'react-native-vector-icons/MaterialIcons'

import Spot from './Spot'

export default class SpotList extends Component {

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
      <View style={styles.container}>
          {this.props.data.loading ? 
          <ActivityIndicator/>
          :
          <OptimizedFlatList style={styles.container}
            data={this.props.data.allSpots} 
            keyExtractor={item => item.id}
            initialNumToRender={10}
            refreshing={this.props.data.networkStatus === 4}
            onRefresh={this.props.data.refetch}
            renderItem={({item}) => {
              return (
                <Spot 
                  address={item.spot_name} 
                  coordinates={item.coordinates}
                  lat={item.lat}
                  lon={item.lon}
                  userLat={this.state.userLatitude}
                  userLon={this.state.userLongitude}
                />
                )
              }}
          />
          }
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
    )
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
