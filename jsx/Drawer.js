import React, { Component } from 'react'
import { 
  View,
  Text,
  Button, 
  StyleSheet, 
  DrawerLayoutAndroid, 
  TouchableHighlight, 
  StatusBar, 
  Platform
} from 'react-native'
import { Link } from 'react-router-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Toolbar from './Toolbar'

export default class Drawer extends Component {
  constructor() {
    super()
    this.openDrawer = this.openDrawer.bind(this)
    this.closeDrawer = this.closeDrawer.bind(this)
  }

  openDrawer() {
    this.drawer.openDrawer()
  }
  closeDrawer() {
    this.drawer.closeDrawer()
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <NavigationView closeDrawer={this.closeDrawer} />}
        >
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
          <NavigationItem iconName="format-list-bulleted" name="Paikat" to='/' closeDrawer={this.props.closeDrawer}/> 
          <NavigationItem iconName="info" name="Info" to='/'/>
          <NavigationItem iconName="email" name="Contact" to='/'/>
          <NavigationItem iconName="share" name="Share with friends" to='/'/>
        </View>
      </View>
    )
  }
}

class NavigationItem extends Component {
  render() {
    return (
      <Link to={this.props.to}>
        <View style={{ marginTop: 10, marginLeft: 20, marginBottom: 10, flexDirection: 'row', alignItems: 'center'}}>
          <Icon name={this.props.iconName} size={35} color="gray" />
          <Text style={{color: '#000000', paddingLeft: 30, fontSize: 20, }} >{this.props.name}</Text>
        </View>
      </Link>
    )
  }
}