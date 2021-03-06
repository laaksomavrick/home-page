import { current, login, create } from '@/api/user' 

const state = {
  user: {},
  jwt: '',
  authenticated: false
}

const actions = {

  fetch_user_token({ commit }, payload) {
    return new Promise((resolve, reject) => {
      login(payload)
        .then(res => res.body.jwt)
        .then(jwt => { 
          commit('receive_jwt', jwt)
          resolve(true)
        })
        .catch(err => {
          commit('error_jwt')
          reject()
        })
    })
  },

  fetch_user({ commit }, payload) {
    return new Promise((resolve, reject) => {
      current()
        .then(res => res.body)
        .then(user => {
          commit('receive_user', user)
          resolve()
        })
        .catch(err => {
          reject()
        })
    })
  },

  check_user_token({ commit }) {
    const jwt = localStorage.getItem("JWT")
    if (jwt) {
      commit('receive_jwt', jwt)
    }
  },

  logout({ commit }) {
    localStorage.removeItem("JWT")
    commit('logout')
  }

}

const mutations = {

  receive_jwt (state, jwt) {
    state.jwt = jwt
    state.authenticated = true
    localStorage.setItem("JWT", jwt)
  },

  error_jwt (state) {
    state.jwt = null
    state.authenticated = false
  },

  receive_user (state, user) {
    state.user = user
  },

  logout (state) {
    state.user = null
    state.jwt = null
    state.authenticated = false
  }

}

const getters = {

  get_authenticated: (state) => {
    return state.authenticated
  },

  get_jwt: (state) => {
    return state.jwt
  },

  get_user:(state) => {
    return state.user
  }

}

export default {
  state,
  actions,
  mutations,
  getters
}
