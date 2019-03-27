import { mapActions, mapGetters } from 'vuex'
import config from '../../../public/config'
var randomstring = require("randomstring");
export default {
  name: 'login',
  components: {},
  props: [],
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  mounted () {
    console.log(randomstring.generate())
  },
  methods: {
    /*...mapActions([
      'login'
    ])*/
    login(){
      var state=randomstring.generate()
      document.cookie = "hash="+state;
      window.location.href = `${config.botlogin}?state=`+state+`&redirecturl=${config.redirect_url}/callback`;
      
      //https://3botlog.in?state=abc123&redirecturl=https%3A%2F%2Fexample.com%2Fcallback
    }
  },
  watch: {
    user (val) {
      if (val) {
        this.$router.push({ name: 'profile' })
      }
    }
  }
}
