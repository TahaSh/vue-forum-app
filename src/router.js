import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Category from './views/Category.vue'
import Topic from './views/Topic.vue'
import CreateTopic from './views/CreateTopic.vue'
import EditTopic from './views/EditTopic.vue'
import CreateCategory from './views/CreateCategory.vue'
import EditCategory from './views/EditCategory.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import AccountSettings from './views/AccountSettings.vue'
import NotFound from './views/NotFound.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true
      }
    },
    {
      path: '/account-settings',
      name: 'AccountSettings',
      component: AccountSettings,
      meta: {
        auth: true
      }
    },
    {
      path: '/new-category',
      name: 'CreateCategory',
      component: CreateCategory,
      meta: {
        auth: true,
        permissions: ['categories:write']
      }
    },
    {
      path: '/c/:categorySlug/edit',
      name: 'EditCategory',
      component: EditCategory,
      meta: {
        auth: true,
        permissions: ['categories:write']
      }
    },
    {
      path: '/c/:categorySlug',
      name: 'Category',
      component: Category
    },
    {
      path: '/t/:topicId',
      name: 'Topic',
      component: Topic
    },
    {
      path: '/c/:categorySlug/new-topic',
      name: 'CreateTopic',
      component: CreateTopic,
      meta: { auth: true }
    },
    {
      path: '/t/:topicId/edit',
      name: 'EditTopic',
      component: EditTopic,
      meta: { auth: true }
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
