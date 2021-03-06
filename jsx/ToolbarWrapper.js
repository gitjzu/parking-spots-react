import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Toolbar } from 'react-native-material-ui'

import I18n from './i18n/i18n'

export default class ToolbarWrapper extends Component {
  render(){
    
    const { 
      search,
      title,
      leftIcon,
      action,
    } = this.props
    return(
      <View>
        { Platform.OS === 'android' && Platform.Version >= 20 ?
            <View
              style={{
                height: 24,
                backgroundColor: "#304ffe",
              }}
            />
            : null }
            <Toolbar
              leftElement={leftIcon}
              centerElement={title}
              onLeftElementPress={action}
              searchable={ search ? {
                autoFocus: true,
                placeholder: I18n.t('search'),
                onChangeText: (value) => {console.log(value)},
              } : null}
            />
      </View>
    )
  }
}
