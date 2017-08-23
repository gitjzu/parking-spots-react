import React, { Component } from 'react'
import { View, Platform, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default class MenuButton extends Component {
  render(){
    return(
      <TouchableHighlight onPress={() => console.log(this.refs)}>
        <View style={{ margin: 15, borderRadius: 25}}>
          <Icon name='md-menu' color='white' size={30}/>
          {console.log(this.props)}
        </View>
        
      </TouchableHighlight>
    )
  }
}
