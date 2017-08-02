/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import SpotList from './jsx/SpotList'

export default class ParkingSpots extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SpotList />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('ParkingSpots', () => ParkingSpots);
