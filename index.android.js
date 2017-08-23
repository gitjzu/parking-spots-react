import React, { Component } from 'react'
import { 
  ApolloClient, 
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform
} from 'react-native'
import { NativeRouter, Link } from 'react-router-native'
import { Navigation, Card } from 'react-router-navigation'
import Icon from 'react-native-vector-icons/Ionicons';
import { api } from './configs/config.js'
import DetailedSpot from './jsx/DetailedSpot'
import MenuButton from './jsx/MenuButton'
import Drawer from './jsx/Drawer'
import App from './jsx/App'

export default class ParkingSpots extends Component {
  createClient() {
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: api,
      }),
    })
  }

  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <NativeRouter>
          <Drawer>
            { Platform.OS === 'android' && Platform.Version >= 20 ?
            <View
              style={{
                height: 24,
                backgroundColor: "#304ffe",
              }}
            />
            : null }
            <Navigation
              navBarStyle={navBarStyles.navBar}
              titleStyle={navBarStyles.title}
              backButtonTintColor='white'
              backButtonTitle='Takaisin'
              title='Parking Spots'
            >
              <Card
                style={styles.container}
                exact
                path="/"
                component={App}
                renderLeftButton={() => <MenuButton/>}
              />
              <Card
                path="/spot"
                component={DetailedSpot}
              />
            </Navigation>
          </Drawer>
        </NativeRouter> 
      </ApolloProvider>
    )
  }
}

const navBarStyles = StyleSheet.create({
  navBar: {
    backgroundColor: '#304ffe',
  },
  title: {
    color: 'white'
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

AppRegistry.registerComponent('ParkingSpots', () => ParkingSpots)
