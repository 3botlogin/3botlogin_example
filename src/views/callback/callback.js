import { mapActions, mapGetters } from 'vuex'
import config from '../../../public/config'
const axios = require('axios');
export default {
  name: 'callback',
  components: {},
  props: [],
  data () {
    return {
        name: this.username
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    console.log(window.location.href)
    var url_string = window.location.href
    var url = new URL(url_string)
    var username = url.searchParams.get("username");
    var signedhash = url.searchParams.get("signedhash");
    var hash = url.searchParams.get("hash");
    console.log('user: '+username+' signedhash: '+signedhash+' hash: '+hash);
    axios.post(`${config.botlogin}/api/verify`, {
        username: username,
        signedhash: signedhash,
        hash: hash
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  methods: {
    /*...mapActions([
      'login'
    ])*/
    
  }
  
}
