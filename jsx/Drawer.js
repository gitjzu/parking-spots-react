import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, DrawerLayoutAndroid } from 'react-native'
import Toolbar from './Toolbar'

export default class Drawer extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => this.navigationView}>
          <Toolbar />
          {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}

const navigationView = (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
    </View>
  )