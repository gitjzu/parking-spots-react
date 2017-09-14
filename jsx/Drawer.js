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
import { ListItem } from 'react-native-material-ui'

export default class Drawer extends Component {
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={(_drawer) => this.drawer = _drawer}
        renderNavigationView={() => (
          <NavigationView 
            closeDrawer={this.close}
            history={this.props.history}
            location={this.props.location}
          />
          )}
        >
        {this.props.children}
      </DrawerLayoutAndroid>
    )
  }

  open = () => this.drawer.openDrawer()
  close = () => this.drawer.closeDrawer()
}

class NavigationView extends Component {
  render() {
    return (
      <View>
        <StatusBar
          translucent
          backgroundColor='rgba(0, 0, 0, 0.20)'
          animated
        />
        <View style={{height:185, backgroundColor:'#0092DB', justifyContent: 'flex-end'}}>
          <Icon name='local-parking' size={80} color='#FFFFFF' />
          <View style={{marginLeft: 20, marginBottom: 10}}>
            <Text style={{color: '#FFFFFF'}} >Helsingin ilmaiset 24H parkit</Text>
            <Text style={{color: '#FFFFFF'}} >Versio 0.1</Text>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          {menuItems.map((item, i) => {
            return (
              <NavigationItem 
                key={i}
                iconName={item.iconName} 
                name={item.name}
                to={item.to}
                closeDrawer={this.props.closeDrawer} 
                history={this.props.history}
                location={this.props.location}
              /> 
            )
          })}
        </View>
      </View>
    )
  }
}

class NavigationItem extends Component {
  render() {
    return (
      <View>
        <ListItem
          dense
          key={this.props.name}
          leftElement={<Icon name={this.props.iconName} size={30}/>}
          centerElement={this.props.name}
          onPress={this.handlePress}
          style={{}}
          numberOfLines={2}
        />
      </View>
    )
  }
  handlePress = () => {
    const { history, closeDrawer, to, location } = this.props

    if (location.pathname !== to) {
      history.push(to)  
    }
    
    closeDrawer()
  }
}

const menuItems = [
  {
    iconName: 'format-list-bulleted',
    name: 'Paikat',
    to: '/',
  },
  {
    iconName: 'info',
    name: 'UKK',
    to: '/ukk',
  },
  {
    iconName: 'email',
    name: 'Anna palautetta',
    to: '/',
  },
  {
    iconName: 'share',
    name: 'Jaa kavereiden kanssa',
    to: '/',
  }
]