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
  static navigationOptions = ({ navigation, screenProps }) => ({
    headerRight: <Icon name='more-vert' size={25} style={{marginRight: 15}} />,
  })

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
      tabBarIcon: ({tintColor}) => (
        <Icon name='menu' size={25} style={{color: tintColor}}/>
      ),
    } 
  },
  Map: { 
    screen: SpotMap, 
    navigationOptions: {
      title: 'Kartta',
      tabBarVisible: true,
      tabBarIcon: ({tintColor}) => (
        <View style={styles.middleTab}>
          <View style={styles.middleTabHalfCircleBorder} />
          <View style={styles.middleTabIcon}>
            <Icon name='local-parking' size={50} style={{color: tintColor}} />
          </View>
        </View>
      )
    }
  },
  Faq: { 
    screen: Faq, 
    navigationOptions: {
      title: 'FAQ',
      tabBarVisible: true,
      tabBarIcon: ({tintColor}) => (
        <Icon name='search' size={25} style={{color: tintColor}}/>
      ),
    }
  },
}, {
  tabBarOptions: {
    showIcon: true,
    showLabel: false,
    activeTintColor: '#304ffe',
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

const styles = StyleSheet.create({
  middleTab: {
    height: 80,
    width: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    bottom: 0,
    backgroundColor: '#F7F7F7',
    position: 'relative'
  },
  middleTabHalfCircleBorder: {
    width: 80,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    height: 40,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 0,
    borderColor: 'rgba(48,79,254, .3)',
    position: 'absolute'
  },
  middleTabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
  }
})

const uiTheme = {
  palette: {
    primaryColor: '#304ffe',
    accentColor: '#FF4081',
  }
}

AppRegistry.registerComponent('ParkingSpots', () => RootStack)
