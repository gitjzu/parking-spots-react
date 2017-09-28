import React, { Component } from 'react'
import { 
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
} from 'react-native'
import CardView from 'react-native-cardview'

export default class Faq extends Component {
  render() {    
    return(
      <View style={styles.container}>
        
        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>Kysymys:</Text>
          <Text style={styles.question}>Miksi Ilmaisparkki-sovelluksessa näkyy eri kilometri etäisyys, kuin Googlen karttasovelluksessa?</Text>

          <Text style={{fontWeight: 'bold'}}>Vastaus:</Text>
          <Text style={styles.answer}>Ilmaisparkki-sovelluksen laskema etäisyys on vain suuntaa antava, koska se lasketaan ns. linnuntietä </Text>
        </CardView>

        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>Kysymys:</Text>
          <Text style={styles.question}>Mistä Ilmaisparkki-sovellus saa tiedot parkkipaikoista?</Text>

          <Text style={{fontWeight: 'bold'}}>Vastaus:</Text>
          <Text style={styles.answer} onPress={() => Linking.openURL('http://tinyurl.com/y73zcj8s')}>Tiedot parkkipaikoista tulevat täältä:  http://tinyurl.com/y73zcj8s</Text>
        </CardView>

        <CardView style={styles.card}>
          <Text style={{fontWeight: 'bold'}}>Kysymys:</Text>
          <Text style={styles.question}>Milloin parkkipaikkojen tiedot ovat viimeksi päivitetty?</Text>

          <Text style={{fontWeight: 'bold'}}>Vastaus:</Text>
          <Text style={styles.answer}>Tiedot ovat päivitetty 21.07.2017</Text>
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
