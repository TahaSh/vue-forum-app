import apiClient from 'api-client'

export default {
  state: {
    all: [],
    current: {}
  },

  actions: {
    async loadCategories ({ commit }) {
      const categories = await apiClient.getCategories()
      commit('SET_CATEGORIES', { categories })
    },

    async loadCurrentCategory ({ commit }, { categorySlug }) {
      const category = await apiClient.getCategory(categorySlug)
      commit('SET_CURRENT_CATEGORY', { category })
    },

    async createCategory ({ commit }, { data }) {
      const categorySlug = (await apiClient.createCategory(data)).slug
      return categorySlug
    },

    async updateCategory ({ commit }, { categorySlug, data }) {
      await apiClient.updateCategory(categorySlug, data)
      return categorySlug
    },

    async deleteCategory ({ commit }, { categorySlug }) {
      await apiClient.deleteCategory(categorySlug)
      commit('DELETE_CATEGORY', { categorySlug })
    }
  },

  mutations: {
    SET_CATEGORIES (state, { categories }) {
      state.all = categories
    },

    SET_CURRENT_CATEGORY (state, { category }) {
      state.current = category
    },

    DELETE_CATEGORY (state, { categorySlug }) {
      state.all = state.all.filter(
        category => category.slug !== categorySlug
      )
    }
  }
}
