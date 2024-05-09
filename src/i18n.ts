

import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import Resources from './Lang/Resources';

i18next
  .use(initReactI18next)
  .init({
    resources:Resources,
    lng: 'ar',
    fallbackLng: 'ar',
    
    interpolation: {
      escapeValue: false, 
    },
  });