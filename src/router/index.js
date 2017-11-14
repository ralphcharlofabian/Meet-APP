import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import MeetUp from '@/components/meetUp/meetUps'
import CreateMeetUps from '@/components/meetUp/createMeetUp'
import Profile from '@/components/user/profile'
import SignIn from '@/components/user/signIn'
import SignUp from '@/components/user/signUp'
import ViewMeetUp from '@/components/meetUp/viewMeetUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home},
    {
      path: '/MeetUp',
      name: 'MeetUp',
      component: MeetUp},
    {
      path: '/MeetUp/:id',
      name: 'MeetUp',
      component: ViewMeetUp
    },
    {
      path: '/CreateMeetUps',
      name: 'CreateMeetUps',
      component: CreateMeetUps
    },
    {
      path: '/Profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
