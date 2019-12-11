import Vue from 'vue'
import apiClient from 'api-client'

export default {
  state: {
    list: [],
    current: null
  },

  actions: {
    async loadTopics ({ commit }, { filters }) {
      const topics = await apiClient.getTopics(filters)
      commit('SET_TOPICS_LIST', { topics })
    },

    async loadCurrentTopic ({ commit }, { topicId }) {
      const topic = await apiClient.getTopic(topicId)
      commit('SET_CURRENT_TOPIC', { topic })
    },

    async createTopic ({ commit }, { data }) {
      const topicId = (await apiClient.createTopic(data))._id
      return topicId
    },

    async updateTopic ({ commit }, { topicId, data }) {
      await apiClient.updateTopic(topicId, data)
      return topicId
    },

    async deleteTopic ({ commit }, { topicId }) {
      await apiClient.deleteTopic(topicId)
    },

    async addReply ({ state, commit }, { data }) {
      const reply = await apiClient.addReply(state.current._id, data)
      commit('ADD_REPLY_TO_CURRENT_TOPIC', { reply })
    },

    async deleteReply ({ state, commit }, { replyId }) {
      await apiClient.deleteReply(state.current._id, replyId)
      commit('DELETE_REPLY_FROM_CURRENT_TOPIC', { replyId })
    },

    async updateReply ({ state, commit }, { replyId, data }) {
      await apiClient.updateReply(state.current._id, replyId, data)
      commit('UPDATE_REPLY', { replyId, data })
      return replyId
    }
  },

  mutations: {
    SET_TOPICS_LIST (state, { topics }) {
      state.list = topics
    },

    SET_CURRENT_TOPIC (state, { topic }) {
      state.current = topic
    },

    ADD_REPLY_TO_CURRENT_TOPIC (state, { reply }) {
      state.current.replies = [
        ...state.current.replies,
        reply
      ]
    },

    DELETE_REPLY_FROM_CURRENT_TOPIC (state, { replyId }) {
      state.current.replies = state.current.replies.filter(
        reply => reply._id !== replyId
      )
    },

    UPDATE_REPLY (state, { replyId, data }) {
      const replyIndex = state.current.replies.map(reply => reply._id).indexOf(replyId)
      if (replyIndex !== -1) {
        Vue.set(state.current.replies, replyIndex, { ...state.current.replies[replyIndex], ...data })
      }
    }
  }
}
