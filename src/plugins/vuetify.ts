import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#2a9d8f',
        accent: '#264653',
        secondary: '#e9c46a',
        info: '#edf2f4',
        warning: '#f4a261',
        error: '#e76f51',
        success: '#90be6d',
      },
    },
  },
})
