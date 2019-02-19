import { mapGetters } from "vuex";

export default {
  name: 'profile',
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

  }
}
