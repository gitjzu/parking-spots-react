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
  View,
} from 'react-native'
import { ThemeProvider } from 'react-native-material-ui'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { api } from './configs/config.js'
import App from './jsx/App'
import Faq from './jsx/Faq'
import SpotMap from './jsx/SpotMap'
import CustomTabBarBottom from './jsx/CustomTabBarBottom'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)


export class ParkingSpots extends Component {
  createClient() {
    return new ApolloClient({
      networkInterface: createNetworkInterface({
        uri: api,
      }),
    })
  }

  static navigationOptions = {
    title: 'Main',
  }

  render() {
    return (
      <ApolloProvider client={this.createClient()}>
        <ThemeProvider uiTheme={uiTheme} >
          <App/>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export const TabNavigation = TabNavigator({
  Home: { 
    screen: ParkingSpots,
    navigationOptions: {
      title: 'Ilmaisparkki',
      tabBarVisible: true,
      tabBarIcon: () => (
        <Icon name='settings' size={25} />
      ),
    } 
  },
  Map: { 
    screen: SpotMap, 
    navigationOptions: {
      title: 'Kartta',
      tabBarVisible: true,
      tabBarIcon: () => (
        <View style={{
          height: 80,
          width: 80,
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#F7F7F7',
          borderRightWidth: StyleSheet.hairlineWidth,
          borderLeftWidth: StyleSheet.hairlineWidth,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: 'rgba(48,79,254, .3)',
          }}
        >
          <Icon name='settings' size={50} />
        </View>
      )
    }
  },
  Faq: { 
    screen: Faq, 
    navigationOptions: {
      title: 'FAQ',
      tabBarVisible: true,
      tabBarIcon: () => (
        <Icon name='settings' size={25} />
      ),
    }
  },
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    style: {
      height: 80,
      width: '100%',
      backgroundColor: 'transparent',
      position: 'absolute',
      bottom: 0,
    }
  },
  tabBarComponent: CustomTabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
})

export const RootStack = StackNavigator({
  Home: { screen: TabNavigation }
})

const uiTheme = {
  palette: {
    primaryColor: '#304ffe',
    accentColor: '#FF4081',
  }
}

AppRegistry.registerComponent('ParkingSpots', () => RootStack)
