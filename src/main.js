import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth) && !store.getters.user) {
    next({
      name: 'login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
