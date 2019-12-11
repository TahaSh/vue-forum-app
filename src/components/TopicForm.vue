<template>
  <base-spinner v-if="loading"/>
  <span
    v-else-if="unauthorized"
    class="unauthorized-error-message"
  >
    You cannot edit this topic.
  </span>
  <div
    v-else
    class="topic-form page-form"
  >
    <div class="field">
      <label class="label">Title</label>
      <base-input
        v-model="title"
        :errors="$v.title"
      />
    </div>
    <div
      v-if="categoryOptions"
      class="field"
    >
      <label class="label">Category</label>
      <base-select-input
        v-model="category"
        :options="categoryOptions"
        placeholder="Select a category"
        :errors="$v.category"
      />
    </div>
    <div class="field">
      <label class="label">Content</label>
      <base-textarea
        v-model="content"
        :errors="$v.content"
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
      default: ''
    },

    topicId: {
      type: [String, Number],
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
      content: '',
      category: '',
      loading: false,
      errorMessage: '',
      unauthorized: false
    }
  },

  validations: {
    title: { required },
    content: { required },
    category: { required }
  },

  computed: {
    ...mapState({
      categories: state => state.categories.all,
      topic: state => state.topics.current
    }),

    categoryOptions () {
      return this.categories.map(category => ({
        key: category.slug,
        title: category.title
      }))
    }
  },

  async mounted () {
    this.loading = true
    await this.loadCategories()
    if (this.topicId) {
      try {
        await this.loadCurrentTopic({ topicId: this.topicId })
        if (!this.isLoggedIn || (this.currentUser && !this.currentUser.canEditTopic(this.topic))) {
          throw Error('unauthorized')
        }
        this.title = this.topic.title
        this.content = this.topic.content
        this.category = this.topic.category.slug
      } catch (err) {
        this.unauthorized = err.message === 'unauthorized'
      }
    }
    if (this.categorySlug) {
      this.category = this.categorySlug
    }
    this.loading = false
  },

  methods: {
    ...mapActions([
      'loadCategories',
      'loadCurrentTopic',
      'createTopic',
      'updateTopic'
    ]),

    async onSubmit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.loading = true
        try {
          let topicId
          if (this.update) {
            topicId = await this.updateTopic({
              topicId: this.topicId,
              data: {
                title: this.title,
                content: this.content,
                category: this.category
              }
            })
          } else {
            topicId = await this.createTopic({
              data: {
                title: this.title,
                content: this.content,
                category: this.category
              }
            })
          }
          this.loading = false
          this.$router.push({ name: 'Topic', params: { topicId } })
        } catch (error) {
          this.loading = false
          this.errorMessage = `An error occured while ${this.update ? 'updating' : 'creating'} this topic. Please try again later.`
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

.unauthorized-error-message
  color: $errorColor
  text-align: center
  padding: 30px
  background: #FFF
</style>
