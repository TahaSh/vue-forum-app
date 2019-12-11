<template>
  <div class="topics-list">
    <div
      v-if="topics.length === 0"
      class="message"
    >
      This category contains no topics yet. Be the first one to write the first topic.
    </div>
    <div
      v-else
      class="content"
    >
      <topic-item
        v-for="topic in topics"
        :key="topic._id"
        :topic="topic"
      />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopicItem from './TopicItem'

export default {
  components: { TopicItem },
  computed: {
    ...mapState({
      topics: state => state.topics.list
    })
  },

  data () {
    return {
      loading: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.topics-list
  width: 100%

.content
  box-shadow: 0 1px 5px 0 hsla(0, 0, 0, 0.2)
  border-radius: 4px
  overflow: hidden

.topic-item + .topic-item
  border-top: 1px solid #F0F0F0

.topics-list-title
  font-size: 18px
  color: #777
  font-weight 400

.message
  text-align: center
  font-size: 20px
  color: #888
  font-weight: 500
  line-height: 1.5
  margin-top: 50px
</style>
