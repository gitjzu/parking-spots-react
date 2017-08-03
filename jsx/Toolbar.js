import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';

export default class Toolbar extends Component {
  render(){
    return(
     <Icon.ToolbarAndroid
      style={{height: 56, backgroundColor: '#00A4C0'}}
      title="Parking Spots"
      titleColor="white"
      navIconName="md-menu"
      onIconClicked={this.onActionSelected}
      actions={[
        { title: 'Settings', iconName: 'md-settings', iconSize: 30, show: 'never' },
      ]}
      overflowIconName="md-more"
    />
    )
  }
}

const onActionSelected = (position) => {
  console.log('selected position was: ' + position)
  if (position === 0) { // index of 'Settings'

  }
}
