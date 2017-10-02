import React, { Component } from 'react'
import { 
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
} from 'react-native'
import CardView from 'react-native-cardview'

import I18n from './i18n/i18n'

export default class Faq extends Component {
  render() {    
    return(
      <View style={styles.container}>
        
        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>{I18n.t('question')}:</Text>
          <Text style={styles.question}>{I18n.t('q1')}</Text>

          <Text style={{fontWeight: 'bold'}}>{I18n.t('answer')}:</Text>
          <Text style={styles.answer}>{I18n.t('a1')}</Text>
        </CardView>

        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>{I18n.t('question')}:</Text>
          <Text style={styles.question}>{I18n.t('q2')}</Text>

          <Text style={{fontWeight: 'bold'}}>{I18n.t('answer')}:</Text>
          <Text style={styles.answer} onPress={() => Linking.openURL('http://tinyurl.com/y73zcj8s')}>{I18n.t('a2')}:  http://tinyurl.com/y73zcj8s</Text>
        </CardView>

        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>{I18n.t('question')}:</Text>
          <Text style={styles.question}>{I18n.t('q3')}</Text>

          <Text style={{fontWeight: 'bold'}}>{I18n.t('answer')}:</Text>
          <Text style={styles.answer}>{I18n.t('a3')}</Text>
        </CardView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  question: {
    fontSize: 16,
    paddingBottom: 5
  },
  answer: {
    fontSize: 16,
    paddingBottom: 10
  },
  container: {
    flex: 1,
    margin: 10,
  },
  card: {
    padding: 10,
  },
})
