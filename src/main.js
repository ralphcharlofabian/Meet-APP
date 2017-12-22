
import Vue from 'vue'

import Vuetify from 'vuetify'
import './stylus/main.styl'

import App from './App'
import router from './router'
import { store } from './store/storeIndex'
import DateFilter from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/shared/alert'
import EditMeetUpDetailsDialog from './components/meetUp/edit/editMeetUpDetailsDialog'
Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetUpDetailsDialog)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAC7WYc5XTDBQ2zmy8-L1-i64PYSQIG3Fs',
      authDomain: 'meetapp-41d80.firebaseapp.com',
      databaseURL: 'https://meetapp-41d80.firebaseio.com',
      projectId: 'meetapp-41d80',
      storageBucket: 'gs://meetapp-41d80.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    this.$store.dispatch('loadMeetUps')
  }
})
