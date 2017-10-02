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

export default class App extends Component {

  constructor() {
    super()

    this.state = {
      drawerOpen: false,
    }
  }


  render() {
    return (
      <Drawer 
        isOpen={this.state.drawerOpen} 
        onDrawerOpen={this.openDrawer}
        onDrawerClose={this.closeDrawer}
        history={this.props.history}
        location={this.props.location} 
      >
        <Navigation>
          <Card
            style={styles.container}
            exact
            path='/'
            component={MainScreen}
            renderNavBar={() => (
              <ToolbarWrapper
                title={I18n.t('title')}
                leftIcon='menu'
                search={false}
                action={() => this.openDrawer()}
              />
            )}
          />
          <Card
            style={styles.container}
            path='/ukk'
            component={Faq}
            renderNavBar={() => (
              <ToolbarWrapper
                title={I18n.t('faqLong')}
                leftIcon='arrow-back'
                search={false}
                action={() => this.props.history.goBack()}
              />
            )}
          />
        </Navigation>
        <TaskDescriptionAndroid backgroundColor='#304ffe' />
      </Drawer>
    )
  }

  openDrawer = () => {
    this.setState({drawerOpen: true})
  }
  closeDrawer = () => {
    this.setState({drawerOpen: false})
  }
}

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