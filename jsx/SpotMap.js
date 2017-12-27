import React, { Component } from 'react'
import { 
  View,
  StyleSheet,
} from 'react-native'
import MapView from 'react-native-maps'

export default class SpotMap extends Component {
  constructor() {
    super() 

    this.state = {
      region: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView 
          style={styles.container}
          showsUserLocation
          region={this.state.region}
          toolbarEnabled={false}
        />
      </View>
    )
  }

  componentDidMount() {
    this.setState({
      region: this.props.location.state.region,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})
