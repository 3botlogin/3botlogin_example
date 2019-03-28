import config from '../../../public/config'
var randomstring = require('randomstring')
export default {
  name: 'login',
  methods: {
    login () {
      var state = randomstring.generate()
      window.localStorage.setItem('state', state)
      window.location.href = `${config.botForntEnd}?state=${state}&redirecturl=${config.redirect_url}/callback`
    }
  }
}
