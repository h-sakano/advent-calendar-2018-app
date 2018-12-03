import Vue from 'vue'
import firebase from 'firebase/app'
import App from './App.vue'
import router from './router'
import store from './store'
import { Location } from 'vue-router'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyAfrGwmwrla9a8flFCFmkl4FIBMZxORqdU',
  authDomain: 'advent-calendar-2018-app-7a5d3.firebaseapp.com',
  databaseURL: 'https://advent-calendar-2018-app-7a5d3.firebaseio.com',
  projectId: 'advent-calendar-2018-app-7a5d3',
  storageBucket: 'advent-calendar-2018-app-7a5d3.appspot.com',
  messagingSenderId: '298560560632',
}
firebase.initializeApp(config)

store.dispatch('initialize')

type NextType = (to?: string | false | void | Location | ((vm: Vue) => any) | undefined) => void

const requiresAuthGuard = (next: NextType): void => {
  if (store.getters.isAuthenticated) {
    next()
  } else {
    next({ path: 'signin' })
  }
}

const signinGuard = (next: NextType): void => {
  if (store.getters.isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
}

const routerGuard = (next: NextType, guard: (next: NextType) => void) => {
  if (!store.getters.isInitialized) {
    const unwatch = store.watch((state) => state.initialized, () => {
      guard(next)
      unwatch()
    })
  } else {
    guard(next)
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    routerGuard(next, requiresAuthGuard)
  } else if (to.path === '/signin') {
    routerGuard(next, signinGuard)
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
