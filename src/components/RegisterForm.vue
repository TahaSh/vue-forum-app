<template>
  <form
    class="register-form page-form"
    @submit.prevent="submit"
  >
    <span class="error-message">
      {{ serverErrorMessage }}
    </span>
    <div class="field">
      <label class="label">
        Name
      </label>
      <base-input
        v-model="name"
        :errors="$v.name"
      />
    </div>
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
    <div class="field">
      <label class="label">
        Role
      </label>
      <base-select-input
        v-model="role"
        :options="roleOptions"
      />
    </div>
    <div
      v-if="role === 'moderator'"
      class="field"
    >
      <label class="label">
        Moderates category
      </label>
      <base-select-input
        v-model="moderateCategory"
        y-direction="above"
        :loading-options="loadingCategories"
        :options="categoryOptions"
      />
    </div>
    <base-button
      :disabled="loading"
    >
      {{ loading ? 'Signing Up...' : 'Sign Up' }}
    </base-button>
  </form>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, email } from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      name: '',
      email: '',
      password: '',
      role: 'user',
      moderateCategory: '',
      serverErrorMessage: '',
      loading: false,
      loadingCategories: false
    }
  },

  validations: {
    name: { required },
    email: { required, email },
    password: { required }
  },

  computed: {
    ...mapState({
      categories: state => state.categories.all
    }),

    roleOptions () {
      return [
        { key: 'user', title: 'User' },
        { key: 'moderator', title: 'Moderator' },
        { key: 'admin', title: 'Admin' }
      ]
    },

    categoryOptions () {
      return this.loadingCategories
        ? []
        : this.categories.map(category => ({
          key: category.slug,
          title: category.title
        }))
    }
  },

  async mounted () {
    this.loadingCategories = true
    await this.loadCategories()
    this.loadingCategories = false
    if (this.role === 'moderator') {
      this.moderateCategory = this.categoryOptions[0].key
    }
  },

  watch: {
    role (role) {
      this.moderateCategory = role === 'moderator'
        ? this.categoryOptions[0].key
        : ''
    }
  },

  methods: {
    ...mapActions(['registerUser', 'loadCategories']),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        try {
          this.loading = true
          await this.registerUser({
            data: {
              name: this.name,
              email: this.email,
              password: this.password,
              role: this.role,
              moderateCategory: this.moderateCategory
            }
          })
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

.categories-spinner
  display: flex
  justify-content: center
  align-items: center
  margin-bottom: 15px
</style>
