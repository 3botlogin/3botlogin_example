import { mapActions, mapGetters } from 'vuex'

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
  },
  methods: {
    ...mapActions([
      'login'
    ])
  },
  watch: {
    user (val) {
      if (val) {
        this.$router.push({ name: 'profile' })
      }
    }
  }
}
