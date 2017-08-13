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
  View
} from 'react-native'
import { api } from './configs/config.js'
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
        <View style={styles.container}>
          <App />
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

AppRegistry.registerComponent('ParkingSpots', () => ParkingSpots)
