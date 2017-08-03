import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, DrawerLayoutAndroid } from 'react-native'
import SpotList from './SpotList'
import Drawer from './Drawer'

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Drawer>
          <SpotList />
        </Drawer>
      </View>
    )
  }
}
