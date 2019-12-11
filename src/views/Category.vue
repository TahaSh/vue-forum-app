<template>
  <div class="app-page category-page">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <template v-else>
      <div class="header">
        <span class="title">
          {{ currentCategory.title }}
        </span>
        <base-button
          v-if="isLoggedIn && currentUser.can('own_topics:write')"
          class="new-topic-button"
          :to="{ name: 'CreateTopic' }"
        >
          <i class="fas fa-plus plus-icon"></i>
          New Topic
        </base-button>
      </div>
      <topics-list/>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TopicsList from '@/components/TopicsList'

export default {
  components: { TopicsList },
  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState({
      currentCategory: state => state.categories.current
    })
  },

  watch: {
    '$route.params.categorySlug': {
      immediate: true,
      async handler (categorySlug) {
        this.loading = true
        try {
          await this.loadCurrentCategory({ categorySlug })
          await this.loadTopics({ filters: { categorySlug } })
          this.loading = false
        } catch (err) {
          this.$router.push({ name: 'Home' })
          this.loading = false
        }
      }
    }
  },

  methods: {
    ...mapActions([
      'loadTopics',
      'loadCurrentCategory'
    ])
  }
}
</script>

<style lang="stylus" scoped>
.header
  display: flex
  justify-content: space-between
  align-items: center
  margin-bottom: 10px

.plus-icon
  margin-right: 5px

.title
  color: #666

.new-topic-button
  font-size: 14px
</style>
