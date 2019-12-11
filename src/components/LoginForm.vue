<template>
  <form
    class="login-form page-form"
    @submit.prevent="submit"
  >
    <span class="error-message">
      {{ serverErrorMessage }}
    </span>
    <div class="field">
      <label class="label">
        Email
      </label>
      <base-input
        v-model="email"
        type="email"
        :errors="$v.email"
      />
    </div>
    <div class="field">
      <label class="label">
        Password
      </label>
      <base-input
        v-model="password"
        type="password"
        :errors="$v.password"
      />
    </div>
    <base-button
      :disabled="loading"
    >
      {{ loading ? 'Logging In...' : 'Log In' }}
    </base-button>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      email: '',
      password: '',
      serverErrorMessage: '',
      loading: false
    }
  },

  validations: {
    email: { required, email },
    password: { required }
  },

  methods: {
    ...mapActions(['login']),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        try {
          await this.login({ email: this.email, password: this.password })
          this.loading = false
          this.$router.push({ name: 'Home' })
        } catch (err) {
          this.serverErrorMessage = err.data.message
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.field
  margin-bottom: 20px

.label
  display: block
  margin-bottom: 3px

.base-button
  width: 100%

.error-message
  text-align: center
  display: block
  margin-bottom: 10px
  color: $errorColor
</style>
