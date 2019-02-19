import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
require('firebase/auth')
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    setUser: (state, user) => {
      if (user.name === 'ivan') user.name = 'bla'
      state.user = user
    }
  },
  actions: {
    login: (context) => {
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        // var token = result.credential.accessToken
        var user = result.user
        console.log(`User is`, user)
        context.commit('setUser', user)
        firebase.firestore().collection('users').where('email', '==', user.email).get().then(u => {
          console.log(u)
          if (!u.empty) {
            u.docs.forEach(doc => {
              console.log(`it exists`)
              firebase.firestore().collection('users').doc(doc.id).set({
                name: user.displayName,
                email: user.email,
                lastSeen: new Date()
              })
            })
          } else {
            console.log(`!it exists`)
            firebase.firestore().collection('users').add({
              name: user.displayName,
              email: user.email,
              lastSeen: new Date()
            })
          }
        })
      }).catch((error) => {
        console.error(error)
        // var errorCode = error.code
        // var errorMessage = error.message
        // var email = error.email
        // var credential = error.credential
      })
    },
    logout: (context) => {
      firebase.auth().signOut()
      context.commit('setUser', null)
    },
    getUserByMail: (context, mail) => {
      firebase.firestore().collection('users')
    }
  },
  getters: {
    user: (state) => state.user
  }
})
