<template>
  <div class="profile-settings-form page-form">
    <div class="field image-field">
      <base-image-input
        :value="currentUser.avatarUrl"
        :width="250"
        :height="250"
        :crop="true"
        @input="avatar = arguments[0]"
      />
    </div>
    <div class="field">
      <label class="label">Name</label>
      <base-input
        v-model="name"
        :errors="$v.name"
      />
    </div>
    <div class="field">
      <label class="label">Email</label>
      <base-input
        v-model="email"
        :errors="$v.email"
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
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      loading: false,
      errorMessage: '',
      success: false,
      email: '',
      name: '',
      avatar: null
    }
  },

  validations: {
    email: { required, email },
    name: { required }
  },

  mounted () {
    this.name = this.currentUser.name
    this.email = this.currentUser.email
  },

  methods: {
    ...mapActions(['updateCurrentUserProfile']),
    async onSubmit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.loading = true
        try {
          await this.updateCurrentUserProfile({
            data: {
              name: this.name,
              email: this.email,
              ...(this.avatar !== null ? { avatar: this.avatar } : {})
            }
          })
          this.loading = false
          this.success = true
          setTimeout(() => {
            this.success = false
          }, 4000)
        } catch (err) {
          this.errorMessage = 'An error occured while updating your profile.'
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

.image-field
  width: 100%
  display: flex
  justify-content: center
  align-items: center

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
