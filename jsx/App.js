import React, { Component } from 'react'
import { 
  View, 
  Text,
  Button,
  StyleSheet,
  DrawerLayoutAndroid,
  ToastAndroid,
  NativeModules
} from 'react-native'
import { 
  Card,
  Navigation,
} from 'react-router-navigation'
import { 
  Link, 
  withRouter, 
  NativeRouter, 
} from 'react-router-native'

import Drawer from './Drawer'
import MainScreen from './MainScreen'
import Faq from './Faq'
import ToolbarWrapper from './ToolbarWrapper'

export default class App extends Component {

  render() {
    return (
      <NativeRouter>
        <DrawerWithRouter>
          <Navigation renderNavBar={() => <ToolbarWrapper/>}>
            <Card
              style={styles.container}
              exact
              path='/'
              component={MainScreen}
            />
            <Card
              style={styles.container}
              path='/ukk'
              component={Faq}
            />
          </Navigation>
        </DrawerWithRouter>
      </NativeRouter> 
    )
  }
}

//Inject router history prop through withRouter to Drawer component
const DrawerWithRouter = withRouter(Drawer)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const navBarStyles = StyleSheet.create({
  navBar: {
    backgroundColor: '#304ffe',
  },
  title: {
    color: 'white'
  }
})