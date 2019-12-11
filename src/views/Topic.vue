<template>
  <div class="app-page topic-page">
    <base-spinner
      v-if="loading"
      class="page-spinner"
    />
    <template v-else>
      <topic-view
        :topic="topic"
        @delete="onDeleteTopic"
        @reply="jumpToReplyForm"
      />
      <reply-form
        v-if="isLoggedIn"
        ref="replyForm"
      />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import TopicView from '@/components/TopicView'
import ReplyForm from '@/components/ReplyForm'

export default {
  components: {
    TopicView,
    ReplyForm
  },

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapState({
      topic: state => state.topics.current
    })
  },

  watch: {
    '$route.params.topicId': {
      immediate: true,
      async handler () {
        this.loading = true
        try {
          await this.loadCurrentTopic({ topicId: this.$route.params.topicId })
        } catch (err) {
          this.$router.push({ name: 'Home' })
        }
        this.loading = false
      }
    }
  },

  methods: {
    ...mapActions([
      'loadCurrentTopic',
      'deleteTopic'
    ]),

    async onDeleteTopic () {
      this.loading = true
      await this.deleteTopic({ topicId: this.topic._id })
      this.$router.push({
        name: 'Category',
        params: { categorySlug: this.topic.category.slug }
      })
    },

    jumpToReplyForm () {
      if (this.$refs.replyForm) {
        this.$refs.replyForm.$el.scrollIntoView()
        this.$refs.replyForm.focus()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.topic-page
  width: 90%
  margin: 30px auto
</style>
