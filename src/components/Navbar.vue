<template>
  <div class="navbar">
    <router-link
      class="logo"
      :to="{ name: 'Home' }"
    >
      Forum
    </router-link>
    <div class="right">
      <navbar-current-user v-if="isLoggedIn"/>
      <template v-else>
        <base-button
          :to="{ name: 'Register' }"
        >
          Sign Up
        </base-button>
        <base-button
          :to="{ name: 'Login' }"
        >
          Log In
        </base-button>
      </template>
    </div>
  </div>
</template>

<script>
import NavbarCurrentUser from './NavbarCurrentUser'

export default {
  components: { NavbarCurrentUser }
}
</script>

<style lang="stylus" scoped>
.navbar
  display: flex
  justify-content: space-between
  align-items: center
  background: #FFF
  padding: 10px 15px
  box-shadow: 0 1px 4px 0 hsla(0, 0, 0, 0.1)

.right > *
  margin-left: 15px

.logo
  text-decoration none
  color: #000
</style>
