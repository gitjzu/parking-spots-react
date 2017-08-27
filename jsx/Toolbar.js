import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Toolbar extends Component {
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
        <Icon.ToolbarAndroid
          style={{height: 56, backgroundColor: '#304ffe'}}
          title="Parking Spots"
          titleColor="white"
          navIconName="md-menu"
          onIconClicked={() => this.props.navBarRef.openDrawer()}
        />
      </View>
    )
  }
}
