import React, { Component } from 'react'
import { 
  View,
  Text,
  Button, 
  StyleSheet, 
  DrawerLayoutAndroid, 
  TouchableHighlight, 
  StatusBar, 
  Platform,
  Linking,
  Share,
} from 'react-native'
import { Link } from 'react-router-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ListItem } from 'react-native-material-ui'

import { devEmail, linkToPlayStore } from '../configs/config'

export default class Drawer extends Component {
  render() {
    const { history, location, children, onDrawerClose } = this.props
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        ref={_drawer => this.drawer = _drawer}
        renderNavigationView={() => (
          <NavigationView 
            closeDrawer={onDrawerClose}
            history={history}
            location={location}
          />
          )}
        >
        {children}
      </DrawerLayoutAndroid>
    )
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.open()
    } else {
      this.close()
    }
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
                to={item.to ? item.to : null}
                link={item.link ? item.link : null}
                share={item.share ? item.share : null}
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
    const { history, closeDrawer, to, location, link, share } = this.props

    if (link) return Linking.openURL(link)
    if (share) {
      return Share.share({
        message: 'Lataa Ilmaisparkki Play-kaupasta, sovellus on täysin ilmainen!' + linkToPlayStore,
        title: 'Löydä ilmaisia 24h parkkipaikkoja Helsingistä!'
      }, {
        dialogTitle: 'Jaa sovellus kavereillesi!',
      })
    }


    if (location.pathname !== to) {
      //If we are trying to go to mainscreen, do not open a new activity. Instead go one activity back to preserve memory
      if (to === '/') {
        history.goBack()
      }
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
    link: 'mailto:' + devEmail + '?subject=Palaute sovelluksesta:',
  },
  {
    iconName: 'share',
    name: 'Jaa kavereiden kanssa',
    share: true,
  }
]