import apiClient from 'api-client'
import permissionCheckers from './permissionCheckers'

export default {
  state: {
    currentUser: null
  },

  actions: {
    async registerUser ({ state }, { data }) {
      const user = await apiClient.registerUser(data)
      return user
    },

    async login ({ commit }, { email, password }) {
      const { token, user } = await apiClient.login({ email, password })
      localStorage.setItem('auth_token', token)
      commit('SET_USER_DATA', { user })
    },

    logout ({ commit }) {
      localStorage.removeItem('auth_token')
      commit('SET_USER_DATA', { user: null })
    },

    async loadCurrentUser ({ commit, dispatch }) {
      const token = localStorage.getItem('auth_token')
      if (token) {
        try {
          const user = await apiClient.getUserData()
          commit('SET_USER_DATA', { user })
        } catch (e) {
          if (e.data.message === 'out-of-date token') {
            dispatch('logout')
          }
        }
      }
    },

    async updateCurrentUserProfile ({ commit }, { data }) {
      const { token, user } = await apiClient.updateUserProfile({ data })
      localStorage.setItem('auth_token', token)
      commit('SET_USER_DATA', { user })
    },

    async updateCurrentUserPassword ({ commit }, { data }) {
      await apiClient.updateUserPassword({ data })
    }
  },

  mutations: {
    SET_USER_DATA (state, { user }) {
      state.currentUser = {
        ...user,
        ...permissionCheckers
      }
    }
  },

  getters: {
    isLoggedIn (state) {
      const token = localStorage.getItem('auth_token')
      return (state.currentUser !== null) && (token !== null)
    }
  }
}
