import config from '../../../public/config'
import CryptoService from '../../services/CryptoService'
var randomstring = require('randomstring')
export default {
  name: 'login',
  data () {
    return {
      privateKey: null,
      publicKey: null,
      privateKey2: null,
      publicKey2: null,
      message: null,
      encrypted: null,
      decrypted: null,
      nonce: null
    }
  },
  methods: {
    login () {
      var state = randomstring.generate()
      window.localStorage.setItem('state', state)
      window.location.href = `${config.botForntEnd}?state=${state}&redirecturl=${config.redirect_url}/callback`
    },
    async loginWithScope () {
      var state = randomstring.generate()
      var keys = await CryptoService.generateKeys(config.seedPhrase)
      var appid = 'ExampleAppId'
      var scope = 'user:email'

      window.localStorage.setItem('state', state)
      window.location.href = `${config.botForntEnd}?state=${state}&appid=${appid}&scope=${scope}&publickey=${encodeURIComponent(CryptoService.getEdPkInCurve(keys.publicKey))}&redirecturl=${encodeURIComponent(`${config.redirect_url}/callback`)}`
    }
    // generateKey () {
    //   CryptoService.generateKeys().then(keys => {
    //     this.privateKey = keys.privateKey
    //     this.publicKey = keys.publicKey
    //   })
    // },
    // generateKey2 () {
    //   CryptoService.generateKeys().then(keys => {
    //     this.privateKey2 = keys.privateKey
    //     this.publicKey2 = keys.publicKey
    //   })
    // },
    // async encrypt () {
    //   CryptoService.encrypt(this.message, this.privateKey, this.publicKey2).then(x => {
    //     this.encrypted = x.encrypted
    //     this.nonce = x.nonce
    //   })
    // },
    // async decrypt () {
    //   this.decrypted = await CryptoService.decrypt(this.encrypted, this.nonce, this.privateKey2, this.publicKey)
    // }
  }
}
