import axios from 'axios'

const request = async (method, url, requestData) => {
  try {
    const { data } = await axios({
      baseURL: process.env.VUE_APP_API_SERVER_BASE_URL,
      method,
      url,
      data: requestData,
      headers: { Authorization: 'Bearer ' + (localStorage.getItem('auth_token')) }
    })
    return Promise.resolve(data)
  } catch (err) {
    const error = {
      status: err.response.status,
      data: err.response.data
    }
    return Promise.reject(error)
  }
}

export default {
  getCategories () {
    return request('get', 'categories')
  },

  getCategory (categorySlug) {
    return request('get', `categories/${categorySlug}`)
  },

  createCategory (data) {
    return request('post', 'categories', data)
  },

  updateCategory (categorySlug, data) {
    return request('put', `categories/${categorySlug}`, data)
  },

  deleteCategory (categorySlug) {
    return request('delete', `categories/${categorySlug}`)
  },

  getTopics (filters) {
    if (filters.categorySlug) {
      return request('get', `categories/${filters.categorySlug}/topics`)
    }
  },

  getTopic (topicId) {
    return request('get', `topics/${topicId}`)
  },

  createTopic (data) {
    return request('post', 'topics', data)
  },

  updateTopic (topicId, data) {
    return request('put', `topics/${topicId}`, data)
  },

  deleteTopic (topicId) {
    return request('delete', `topics/${topicId}`)
  },

  addReply (topicId, data) {
    return request('post', `topics/${topicId}/replies`, data)
  },

  deleteReply (topicId, replyId) {
    return request('delete', `topics/${topicId}/replies/${replyId}`)
  },

  updateReply (topicId, replyId, data) {
    return request('put', `topics/${topicId}/replies/${replyId}`, data)
  },

  registerUser (data) {
    return request('post', 'register', data)
  },

  login ({ email, password }) {
    return request('post', 'login', { email, password })
  },

  getUserData () {
    return request('get', 'getprofile')
  },

  updateUserProfile ({ data }) {
    return request('put', 'profile', data)
  },

  updateUserPassword ({ data }) {
    return request('put', 'profile/password', data)
  }
}
