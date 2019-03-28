import config from '../../../public/config'
import main from '../../bus'
import axios from 'axios'
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
    // Get original hash
    var hash = window.localStorage.getItem('hash')
    this.username = username
    // Post to API to verify
    axios.post(`${config.botBackend}/api/verify`, {
      username: username,
      signedhash: signedhash,
      hash: hash
    }).then((response) => {
      this.verified = true
      console.log(response)
      main.$emit('gotUser', username)
    })
  }
}
