import React, { Component } from 'react'
import { 
  View, 
  Text,
  Button,
  StyleSheet,
  DrawerLayoutAndroid,
  ToastAndroid,
  NativeModules,
} from 'react-native'
import { 
  Card,
  Navigation,
} from 'react-router-navigation'
import { Link } from 'react-router-native'
import TaskDescriptionAndroid from 'react-native-android-taskdescription'

import I18n from './i18n/i18n'
import Drawer from './Drawer'
import MainScreen from './MainScreen'
import Faq from './Faq'
import ToolbarWrapper from './ToolbarWrapper'
import SpotMap from './SpotMap'

export default class App extends Component {
  render() {
    return (
      <MainScreen />
    )
  }
}