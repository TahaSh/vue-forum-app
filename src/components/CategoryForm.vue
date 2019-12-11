<template>
  <base-spinner v-if="loading"/>
  <div
    v-else
    class="category-form page-form"
  >
    <div class="field">
      <label class="label">Title</label>
      <base-input
        v-model="title"
        :errors="$v.title"
      />
    </div>
    <div class="field">
      <label class="label">Description</label>
      <base-input
        v-model="description"
        :errors="$v.description"
      />
    </div>
    <div class="submit-field">
      <span
        v-if="errorMessage"
        class="error-message"
      >
        {{ errorMessage }}
      </span>
      <base-button
        @click="onSubmit"
      >
        {{ update ? 'Update' : 'Create' }}
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    categorySlug: {
      type: String,
      default: null
    },

    update: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      title: '',
      description: '',
      loading: false,
      errorMessage: ''
    }
  },

  validations: {
    title: { required },
    description: { required }
  },

  computed: {
    ...mapState({
      category: state => state.categories.current
    })
  },

  async mounted () {
    this.loading = true
    if (this.categorySlug) {
      try {
        await this.loadCurrentCategory({ categorySlug: this.categorySlug })
        this.title = this.category.title
        this.description = this.category.description
      } catch (errr) {
        this.$router.push({ name: 'Home' })
      }
    }
    this.loading = false
  },

  methods: {
    ...mapActions([
      'loadCurrentCategory',
      'createCategory',
      'updateCategory'
    ]),

    async onSubmit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.loading = true
        try {
          let categorySlug
          if (this.update) {
            categorySlug = await this.updateCategory({
              categorySlug: this.categorySlug,
              data: {
                title: this.title,
                description: this.description
              }
            })
          } else {
            categorySlug = await this.createCategory({
              data: {
                title: this.title,
                description: this.description
              }
            })
          }
          this.loading = false
          this.$router.push({ name: 'Category', params: { categorySlug } })
        } catch (error) {
          this.loading = false
          this.errorMessage = `An error occured while ${this.update ? 'updating' : 'creating'} this category. Please try again later.`
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-spinner
  display: flex
  justify-content: center
  align-items: center
  background: #FFF
  padding: 50px 0

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
</style>
