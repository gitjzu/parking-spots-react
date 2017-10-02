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

import I18n from './i18n/i18n'
import { devEmail, linkToPlayStore, versionNumber } from '../configs/config'

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
            <Text style={{color: '#FFFFFF'}} >{I18n.t('drawerInfo')}</Text>
            <Text style={{color: '#FFFFFF'}} >{I18n.t('version')}: {versionNumber}</Text>
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
        message: I18n.t('shareMessage') + linkToPlayStore,
        title: I18n.t('shareTitle')
      }, {
        dialogTitle: I18n.t('shareDialogTitle'),
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
    name: I18n.t('places'),
    to: '/',
  },
  {
    iconName: 'info',
    name: I18n.t('faqShort'),
    to: '/ukk',
  },
  {
    iconName: 'email',
    name: I18n.t('giveFeedback'),
    link: 'mailto:' + devEmail + '?subject=' + I18n.t('feedbackSubject'),
  },
  {
    iconName: 'share',
    name: I18n.t('share'),
    share: true,
  }
]