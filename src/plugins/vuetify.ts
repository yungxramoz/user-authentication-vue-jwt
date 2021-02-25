import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      dark: {
        primary: '#2a9d8f',
        accent: '#2a9d8f',
        secondary: '#e9c46a',
        info: '#e9c46a',
        warning: '#f4a261',
        error: '#e76f51',
        success: '#2a9d8f',
      },
    },
  },
})
