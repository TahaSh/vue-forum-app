export default {
  computed: {
    isLoggedIn () {
      return this.$store.getters.isLoggedIn
    },

    currentUser () {
      return this.$store.state.users.currentUser
    }
  }
}
