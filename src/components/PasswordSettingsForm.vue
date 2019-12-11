<template>
  <div class="password-settings-form page-form">
    <div class="field">
      <label class="label">Current Password</label>
      <base-input
        v-model="currentPassword"
        type="password"
        :errors="$v.currentPassword"
      />
    </div>
    <div class="field">
      <label class="label">New Password</label>
      <base-input
        v-model="newPassword"
        type="password"
        :errors="$v.newPassword"
      />
    </div>
    <div class="submit-field">
      <span
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </span>
      <span
        v-if="success"
        class="success-message"
      >
        <i class="fas fa-check"></i> Saved
      </span>
      <base-button
        :disabled="loading"
        @click="onSubmit"
      >
        {{ loading ? 'Saving...' : 'Save' }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      loading: false,
      errorMessage: '',
      success: false,
      newPassword: '',
      currentPassword: ''
    }
  },

  validations: {
    newPassword: { required },
    currentPassword: { required }
  },

  methods: {
    ...mapActions(['updateCurrentUserPassword']),
    async onSubmit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.loading = true
        try {
          await this.updateCurrentUserPassword({
            data: {
              currentPassword: this.currentPassword,
              newPassword: this.newPassword
            }
          })
          this.loading = false
          this.success = true
          this.errorMessage = ''
          this.$v.$reset()
          this.currentPassword = ''
          this.newPassword = ''
          setTimeout(() => {
            this.success = false
          }, 4000)
        } catch (err) {
          this.errorMessage = err.data.message
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
  margin-bottom: 3px
  display: block

.submit-field
  display: flex
  justify-content: flex-end
  align-items: center

.error-message
  color: $errorColor
  text-align: left
  flex: 1

.success-message
  color: $successColor
  text-align: left
  flex: 1
</style>
