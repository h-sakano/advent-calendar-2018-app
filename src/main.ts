import Vue from 'vue'
import firebase from 'firebase/app'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyAfrGwmwrla9a8flFCFmkl4FIBMZxORqdU',
  authDomain: 'advent-calendar-2018-app-7a5d3.firebaseapp.com',
  databaseURL: 'https://advent-calendar-2018-app-7a5d3.firebaseio.com',
  projectId: 'advent-calendar-2018-app-7a5d3',
  storageBucket: '',
  messagingSenderId: '298560560632',
}
firebase.initializeApp(config)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
