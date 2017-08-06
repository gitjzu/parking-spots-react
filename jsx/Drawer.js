import React, { Component } from 'react'
import { View, Text, Button, StyleSheet, DrawerLayoutAndroid, TouchableHighlight, StatusBar, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toolbar from './Toolbar'

export default class Drawer extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavigationView />}
        ref={'navDrawer'}
        >
          <Toolbar navBarRef={this.refs.navDrawer}/>
          {this.props.children}
      </DrawerLayoutAndroid>
    )
  }
}

class NavigationView extends Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.20)"
          animated
        />
    
        <View style={{height:185, backgroundColor:'#0092DB', justifyContent: 'flex-end'}}>
          <Icon name="local-parking" size={80} color="#FFFFFF" />
          <View style={{marginLeft: 20, marginBottom: 10}} >
            <Text style={{color: '#FFFFFF'}} >Free 24H parking</Text>
            <Text style={{color: '#FFFFFF'}} >Version 0.1</Text>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <NavigationItem iconName="info" name="Info"/>
          <NavigationItem iconName="email" name="Contact"/>
          <NavigationItem iconName="share" name="Share with friends"/>
        </View>
      </View>
    )
  }
}

class NavigationItem extends Component {
  render() {
    return (
      <View>
        <TouchableHighlight underlayColor='rgba(188, 187, 185, 0.8)' onPress={() => console.log('test')}>
          <View style={{ marginTop: 10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
            <Icon name={this.props.iconName} size={35} color="gray" />
            <Text style={{color: '#000000', paddingLeft: 30, fontSize: 20, }} >{this.props.name}</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}