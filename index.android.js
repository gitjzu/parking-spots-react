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
import Spot from './jsx/Spot'

export default class ParkingSpots extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Spot />
        <Spot />
        <Spot />
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
