
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
import EditMeetUpDateDialog from './components/meetUp/edit/editMeetUpDateDialog'
import EditMeetUpTimeDialog from './components/meetUp/edit/editMeetUpTimeDialog'
import RegisterDialog from './components/meetUp/registration/registerDialog'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetUpDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetUpDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetUpTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

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
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetUps')
  }
})
