import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUps: [{
      imageUrl: 'http://japan-magazine.jnto.go.jp/jnto2wm/wp-content/uploads/1608_special_TOTO_main.jpg',
      title: 'Meetup in Japan',
      id: '1',
      date: '2017-11-17'},
    {
      imageUrl: 'https://wanderworld360.com/wp-content/uploads/2016/07/the-merlion-singapore-wallpaper.jpg',
      title: 'Meetup in Singapore',
      id: '2',
      date: '2017-11-18'},
    {
      imageUrl: 'https://www.luxresorts.com/media/2601563/Maldives_Hotels_Resorts_LUX_Maldives_Spa_WellBeing.jpg',
      title: 'Meetup in Maldives',
      id: '3',
      date: '2017-11-20'},
    {
      imageUrl: 'https://media.timeout.com/images/103812417/image.jpg',
      title: 'Meetup in Hong Kong',
      id: '4',
      date: '2017-12-17'},
    {
      imageUrl: 'http://www.lastminute.com/hotels/img/city/Paris-FR.jpg',
      title: 'Meetup in Paris',
      id: '5',
      date: '2017-12-13'}
    ],
    user: {
      id: '10111213',
      registeredMeetUps: ['adsad123']
    }
  },
  mutations: {
    createMeetUp (state, payload) {
      state.loadedMeetUps.push(payload)
    }
  },
  actions: {
    createMeetUp ({commit}, payload) {
      const meetUp = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: '10111213'
      }
      // Reach out for firebase and store it
      commit('createMeetUp', meetUp)
    }
  },
  getters: {
    loadedMeetUps (state) {
      return state.loadedMeetUps.sort((meetUpA, meetUpB) => {
        return meetUpA.date > meetUpB.date
      })
    },
    featuredMeetUps (state, getters) {
      return getters.loadedMeetUps.splice(0, 5)
    },
    loadedMeetUp (state) {
      return (meetUpId) => {
        return state.loadedMeetUps.find((meetUp) => {
          return meetUp.id === meetUpId
        })
      }
    }
  }
})
