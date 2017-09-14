import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Toolbar } from 'react-native-material-ui'

export default class ToolbarWrapper extends Component {
  render(){
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
              leftElement="menu"
              centerElement="Parking Spots"
              searchable={{
                autoFocus: true,
                placeholder: 'Search by name',
                onChangeText: (value) => {console.log(value)},
              }}
            />
      </View>
    )
  }
}
