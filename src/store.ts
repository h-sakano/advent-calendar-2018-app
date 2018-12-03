import firebase from 'firebase/app'
import 'firebase/auth'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export interface StateType {
  initialized: boolean
  user: firebase.User | null
}

export default new Vuex.Store<StateType>({
  state: {
    initialized: false,
    user: null,
  },
  getters: {
    user (state: StateType): firebase.User | null {
      return state.user
    },
    isInitialized (state: StateType): boolean {
      return state.initialized
    },
    isAuthenticated (state: StateType): boolean {
      return !!state.user
    },
  },
  mutations: {
    setUser (state: StateType, payload: firebase.User | null): void {
      state.user = payload
    },
    setInitialized (state: StateType): void {
      state.initialized = true
    },
  },
  actions: {
    initialize ({ state, commit }): void {
      if (!state.initialized) {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            commit('setUser', user)
          }
          commit('setInitialized')
        })
      }
    },
    signOut ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
  },
})
