<template>
  <div class="topic-view">
    <base-confirm-dialog
      v-if="showConfirmDialog"
      confirm-button-title="delete"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="$emit('delete')"
    >
      <template #title>
        Delete this topic?
      </template>
      <template #default>
        You cannot undo this action.
      </template>
    </base-confirm-dialog>
    <h1 class="title">
      {{ topic.title }}
    </h1>
    <div class="author">
      <base-avatar
        class="author-left"
        :src="topic.user.avatarUrl"
        :name="topic.user.name"
      />
      <div class="author-right">
        <span class="author-name">
          {{ topic.user.name }}
        </span>
        <span class="date">
          {{ topic.createdAt | humanizeDate }}
        </span>
      </div>
    </div>
    <p class="topic-content">
      {{ topic.content }}
    </p>
    <div class="topic-footer">
      <div class="topic-footer-reply">
        <h2 class="topic-footer-reply-title">
          {{ topic.replies && topic.replies.length ? topic.replies.length : 'No' }} Replies
        </h2>
        <base-button
          class="reply-button"
          @click="onReply"
        >
          <i class="fas fa-reply reply-icon"></i>
          Reply
        </base-button>
      </div>
      <div class="action-buttons">
        <router-link
          v-if="isLoggedIn && currentUser && currentUser.canEditTopic(topic)"
          :to="{ name: 'EditTopic', params: { topicId: topic._id } }"
        >
          <i class="action-button fas fa-pencil-alt"></i>
        </router-link>
        <i
          v-if="isLoggedIn && currentUser && currentUser.canDeleteTopic(topic)"
          class="action-button fas fa-trash-alt"
          @click="showConfirmDialog = true"
        ></i>
      </div>
    </div>
    <div class="replies-section">
      <div class="replies-content">
        <reply
          v-for="reply in topic.replies"
          :key="reply._id"
          :reply="reply"
          :category-slug="topic.category.slug"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Reply from './Reply'

export default {
  components: { Reply },
  props: {
    topic: {
      type: Object,
      default: () => ({})
    }
  },

  data () {
    return {
      showConfirmDialog: false
    }
  },

  methods: {
    ...mapActions(['setNextRoute']),
    onReply () {
      if (this.isLoggedIn) {
        this.$emit('reply')
      } else {
        this.setNextRoute({ route: this.$route.fullPath })
        this.$router.push({ name: 'Login' })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.topic-view
  background: #FFF
  border-radius: 3px
  padding: 10px 25px

.title
  font-size: 25px
  font-weight: 400
  color: #222
  margin-bottom: 30px

.author
  display: flex
  align-items: center

.author-right
  margin-left: 15px
  display: flex
  flex-direction: column

.author-name
  color: #444

.date
  color: #999
  font-size: 13px
  margin-top: 3px

.topic-content
  line-height: 1.7
  color: #333
  margin-top: 20px

.topic-footer
  display: flex
  justify-content: space-between
  align-items: center
  margin-top: 40px
  padding-bottom: 20px

.topic-footer-reply
  display: flex
  align-items: center

.topic-footer-reply-title
  font-size: 16px
  color: #333
  font-weight: 500
  margin: 0

.reply-button
  margin-left: 20px
  font-size: 14px

.action-button
  margin-left: 15px
  color: $primaryColor
  cursor: pointer

.reply-icon
  margin-right: 3px

.reply
  border-top: 1px solid #F0F0F0
  padding: 30px 0
</style>
