import Vue from 'vue'
import Vuex from 'vuex'
import * as Firebase from 'firebase'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetUps: [{
      imageUrl: 'http://japan-magazine.jnto.go.jp/jnto2wm/wp-content/uploads/1608_special_TOTO_main.jpg',
      title: 'Meetup in Japan',
      id: '1',
      date: new Date(),
      description: 'Japan (Japanese: 日本 Nippon [ɲippoɴ] or Nihon [ɲihoɴ]; formally 日本国 About this sound Nippon-koku or Nihon-koku, meaning "State of Japan") is a sovereign island nation in East Asia. Located in the Pacific Ocean, it lies off the eastern coast of the Asian mainland and stretches from the Sea of Okhotsk in the north to the East China Sea and China in the southwest.The kanji that make up Japans name mean "sun origin". 日 can be read as ni and means sun, while 本 can be read as hon or pon and means "origin". Japan is often referred to by the famous epithet "Land of the Rising Sun" in reference to its Japanese name. Japan is a stratovolcanic archipelago consisting of about 6,852 islands. The four largest are Honshu, Hokkaido, Kyushu and Shikoku, which make up about ninety-seven percent of Japans land area and often are referred to as home islands.',
      location: 'Japan'},
    {
      imageUrl: 'https://wanderworld360.com/wp-content/uploads/2016/07/the-merlion-singapore-wallpaper.jpg',
      title: 'Meetup in Singapore',
      id: '2',
      date: new Date(),
      description: 'Singapore, an island city-state off southern Malaysia, is a global financial center with a tropical climate and multicultural population. Its colonial core centers on the Padang, a cricket field since the 1830s and now flanked by grand buildings such as City Hall, with its 18 Corinthian columns. In Singapore circa-1820 Chinatown stands the red-and-gold Buddha Tooth Relic Temple, said to house one of Buddhas teeth.',
      location: 'Singapore'},
    {
      imageUrl: 'https://www.luxresorts.com/media/2601563/Maldives_Hotels_Resorts_LUX_Maldives_Spa_WellBeing.jpg',
      title: 'Meetup in Maldives',
      id: '3',
      date: new Date(),
      description: 'The Maldives, officially the Republic of Maldives (Maldivian: , Dhivehi Raa jeyge Jumhooriyya), is a South Asian island country, located in the Indian Ocean, situated in the Arabian Sea. It lies southwest of Sri Lanka and India. ',
      location: 'Maldives'},
    {
      imageUrl: 'https://media.timeout.com/images/103812417/image.jpg',
      title: 'Meetup in Hong Kong',
      id: '4',
      date: new Date(),
      description: 'Hong Kong (Chinese: 香港; pronunciation in Hong Kong Cantonese: [hœ́ːŋ.kɔ̌ːŋ]), officially the Hong Kong Special Administrative Region of the Peoples Republic of China, is an autonomous territory on the eastern side of the Pearl River estuary in East Asia, south of the mainland Chinese province of Guangdong, and east of the former Portuguese colony and fellow special administrative region of Macao. ',
      location: 'Hong Kong'},
    {
      imageUrl: 'http://www.lastminute.com/hotels/img/city/Paris-FR.jpg',
      title: 'Meetup in Paris',
      id: '5',
      date: new Date(),
      description: 'Paris, France capital, is a major European city and a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century, Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.',
      location: 'Paris'}
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetUp (state, payload) {
      state.loadedMeetUps.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setLoadedMeetUps (state, payload) {
      state.loadedMeetUps = payload
    }
  },
  actions: {
    loadMeetUps ({commit}) {
      commit('setLoading', true)
      Firebase.database().ref('meetUps').once('value')
      .then((data) => {
        const meetUps = []
        const obj = data.val()
        for (let key in obj) {
          meetUps.push({
            id: key,
            title: obj[key].title,
            description: obj[key].description,
            imageUrl: obj[key].imageUrl,
            date: obj[key].date,
            location: obj[key].location,
            creatorId: obj[key].creatorId
          })
        }
        commit('setLoadedMeetUps', meetUps)
        commit('setLoading', false)
      })
      .catch(
        (error) => {
          console.log(error)
        }
      )
    },
    createMeetUp ({commit, getters}, payload) {
      const meetUp = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      Firebase.database().ref('meetUps').push(meetUp)
      .then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const fileName = payload.image.name
        const ext = fileName.slice(fileName.lastIndexOf('.'))
        return Firebase.storage().ref('meetUps/' + key + '.' + ext).put(payload.image)
      })
      .then(fileData => {
        imageUrl = fileData.metadata.downloadURLs[0]
        return Firebase.database().ref('meetUps').child(key).update({imageUrl: imageUrl})
      })
      .then(() => {
        commit('createMeetUp', {
          ...meetUp,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetUps: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetUps: []
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', { id: payload.uid, registeredMeetUps: [] })
    },
    logout ({commit}) {
      Firebase.auth().signOut()
      commit('setUser', null)
    },
    clearError ({commit}) {
      commit('clearError')
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
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
