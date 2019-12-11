import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import VueClosable from 'vue-closable'
import humanizeDate from './filters/humanizeDate'
import authMixin from './mixins/authMixin'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueClosable)

Vue.filter('humanizeDate', humanizeDate)

Vue.mixin(authMixin)

// Import all base components
const requireComponent = require.context('./components', true, /Base[A-Z]/)
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})

router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('auth_token')
  if (token && !store.getters.isLoggedIn) {
    try {
      await store.dispatch('loadCurrentUser')
    } catch (err) {
      console.log(err)
    }
  }

  if (to.meta.auth && !store.getters.isLoggedIn) {
    store.dispatch('setNextRoute', { route: to.fullPath })
    return next({ name: 'Login' })
  }

  if (to.meta.guest && store.getters.isLoggedIn) {
    return next({ name: 'Home' })
  }

  if (to.meta.permissions && !store.state.users.currentUser.can(to.meta.permissions)) {
    return next({ name: 'NotFound', params: [to.path], replace: true })
  }

  if (store.state.nextRoute && to.name !== 'Login') {
    const nextRoute = store.state.nextRoute
    store.dispatch('setNextRoute', { route: null })
    return next(nextRoute)
  }

  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
