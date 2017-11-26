import {store} from '../store/storeIndex'
export default (to, from, next) => {
  if (store.getters.user) {
    next()
  } else {
    next('/SignIn')
  }
}
