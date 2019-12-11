<template>
  <div class="navbar-current-user">
    <base-menu-dropdown
      :options="options"
      x-direction="left"
      @select="onSelect"
    >
      <base-avatar
        :name="currentUser.name"
        :src="currentUser.avatarUrl"
      />
    </base-menu-dropdown>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  computed: {
    options () {
      return [
        { key: 'settings', title: 'Settings' },
        { key: 'logout', title: 'Log out' }
      ]
    }
  },

  methods: {
    ...mapActions(['logout']),
    onSelect (optionKey) {
      if (optionKey === 'logout') {
        this.logout()
        this.$router.push({ name: 'Home' })
      } else if (optionKey === 'settings') {
        this.$router.push({ name: 'AccountSettings' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.navbar-current-user
  display: flex
  justify-content: center
  align-items: center

.base-avatar
  cursor: pointer
</style>
