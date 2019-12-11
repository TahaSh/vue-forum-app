<template>
  <div class="categories-list">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <div
      v-else-if="error"
      class="error-message"
    >
      An error occured while fetching the categories.<br>Try to reload the page.
    </div>
    <category-item
      v-else
      v-for="category in categories"
      :key="category._id"
      :category="category"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CategoryItem from './CategoryItem'

export default {
  components: { CategoryItem },
  data () {
    return {
      loading: true,
      error: false
    }
  },

  computed: {
    ...mapState({
      categories: state => state.categories.all
    })
  },

  async mounted () {
    try {
      await this.loadCategories()
      this.loading = false
    } catch (err) {
      this.loading = false
      this.error = true
    }
  },

  methods: {
    ...mapActions(['loadCategories'])
  }
}
</script>

<style lang="stylus" scoped>
.category-item
  margin-bottom: 20px

.categories-list-title
  font-size: 18px
  color: #777
  font-weight 400

.error-message
  text-align: center
  font-size: 20px
  color: #888
  font-weight: 500
  line-height: 1.5
  margin-top: 50px
</style>
