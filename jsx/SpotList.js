import React, { Component } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import Spot from './Spot'

export default class SpotList extends Component {

  constructor() {
    super()
    this.state = {
      locationList: [
        {address: 'a'}, 
        {address: 'b'}, 
        {address: 'c'}, 
        {address: 'd'},
      ]
    } 
  }

  render() {
    return (
      <View style={styles.container}>
        {console.log(this.state.locationList)}
        <FlatList style={styles.container}
          data={this.state.locationList} 
          keyExtractor={item => item.address}
          renderItem={({spot}) => {
            console.log(spot)
            return <Spot address={spot} />
            }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
