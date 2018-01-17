import React, { Component } from 'react'
import {
  StyleSheet,
} from 'react-native'
import FloatingActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/MaterialIcons'

import I18n from './i18n/i18n'
export default class FAB extends Component {

  render() {
    return (
      <FloatingActionButton 
        buttonColor='red'
        offsetY={30 + this.props.offset}
        icon={<Icon name='settings' style={styles.FABIcon}/>}
        >
        <FloatingActionButton.Item
          onPress={this.props.onLocate}
          title={I18n.t('locate')}
          buttonTextStyle={{color: '#FFFFFF'}}
        >
          <Icon name='gps-fixed' style={styles.FABIcon}/>
        </FloatingActionButton.Item>

        <FloatingActionButton.Item
          onPress={() => this.props.onFilter('24H')}
          title={I18n.t('showLongTerm')}
          buttonTextStyle={{color: '#FFFFFF'}}
        >
          <Icon name='filter-list' style={styles.FABIcon}/>
        </FloatingActionButton.Item>

        <FloatingActionButton.Item
          onPress={() =>this.props.onFilter('2-4H')}
          title={I18n.t('showShortTerm')}
          buttonTextStyle={{color: '#FFFFFF'}}
        >
          <Icon name='filter-list' style={styles.FABIcon}/>
        </FloatingActionButton.Item>

        <FloatingActionButton.Item
          onPress={() => this.props.onFilter(null)}
          title={I18n.t('showAll')}
          buttonTextStyle={{color: '#FFFFFF'}}
        >
          <Icon name='filter-list' style={styles.FABIcon}/>
        </FloatingActionButton.Item>
        </FloatingActionButton>
    )
  }
}

const styles = StyleSheet.create({
  FABIcon: {
    color: '#FFFFFF',
    fontSize: 25,
  },
})
