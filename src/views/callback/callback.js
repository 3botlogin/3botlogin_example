import config from '../../../public/config'
import cryptoService from '../../services/CryptoService'
import threebotService from '../../services/threebotService'
export default {
  name: 'callback',
  data () {
    return {
      username: null,
      verified: false
    }
  },
  mounted () {
    var url = new URL(window.location.href)
    // Get all query params
    var username = url.searchParams.get('username')
    var signedhash = url.searchParams.get('signedhash')
    this.username = username

    threebotService.getUserData(username).then(async (response) => {
      var user = response.data
      var hash = window.localStorage.getItem('state')
      this.verified = await cryptoService.validateSignature(hash, signedhash, user.publicKey)

      var profile = {
        name: username
      }
      var data = JSON.parse(url.searchParams.get('data'))
      if (data) {
        cryptoService.generateKeys(config.seedPhrase).then(async (keys) => {
          var decrypted = await cryptoService.decrypt(data.ciphertext, data.nonce, keys.privateKey, user.publicKey)
          if (decrypted) {
            decrypted = JSON.parse(decrypted)
            for (var k in decrypted) {
              if (decrypted.hasOwnProperty(k)) {
                profile[k] = decrypted[k]
              }
            }
          }
        }).then(x => {
          window.localStorage.setItem('profile', JSON.stringify(profile))
          this.$router.push({ name: 'profile' })
        })
      } else {
        window.localStorage.setItem('profile', JSON.stringify(profile))
        this.$router.push({ name: 'profile' })
      }
    })
  }
}
