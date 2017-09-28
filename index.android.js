import React, { Component } from 'react'
import { 
  ApolloClient, 
  ApolloProvider,
  createNetworkInterface,
} from 'react-apollo'
import {
  AppRegistry,
  StyleSheet,
  NativeModules,
} from 'react-native'
import { ThemeProvider } from 'react-native-material-ui'
import {  
  withRouter, 
  NativeRouter, 
} from 'react-router-native'

import { api } from './configs/config.js'
import App from './jsx/App'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);


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
        <ThemeProvider uiTheme={uiTheme} >
          <NativeRouter>
            <AppWithRouter />
          </NativeRouter>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

//Inject router history prop through withRouter to App component
const AppWithRouter = withRouter(App)

const uiTheme = {
  palette: {
    primaryColor: '#304ffe',
    accentColor: '#FF4081',
  }
}

AppRegistry.registerComponent('ParkingSpots', () => ParkingSpots)
