import I18n from 'react-native-i18n'
import en from './en'
import fi from './fi'

I18n.fallbacks = true

I18n.translations = {
  en,
  fi
}

export default I18n