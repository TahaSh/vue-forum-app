<template>
  <div class="reply">
    <base-confirm-dialog
      v-if="showConfirmDialog"
      confirm-button-title="delete"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="deleteReply({ replyId: reply._id })"
    >
      <template #title>
        Delete this reply?
      </template>
      <template #default>
        You cannot undo this action.
      </template>
    </base-confirm-dialog>
    <div class="author">
      <base-avatar
        class="author-left"
        :name="reply.user.name"
        :src="reply.user.avatarUrl"
      />
      <div class="author-right">
        <span class="author-name">
          {{ reply.user.name }}
        </span>
        <span class="date">
          {{ reply.createdAt | humanizeDate }}
        </span>
      </div>
    </div>
    <p class="reply-content">
      <template v-if="!editing">
        {{ reply.content }}
      </template>
      <template v-else>
        <base-textarea
          v-model="content"
          :disabled="loading"
          :min-height="150"
        />
        <base-button
          :disabled="loading"
          @click="saveReply"
        >
          {{ loading ? 'Saving...' : 'Save' }}
        </base-button>
        <base-button
          class="cancel-button"
          theme="borderless"
          @click="editing = false"
        >
          Cancel
        </base-button>
      </template>
    </p>
    <div
      v-if="!editing"
      class="actions"
    >
      <i
        v-if="isLoggedIn && currentUser.canEditReply(reply, categorySlug)"
        class="action-button fas fa-pencil-alt"
        @click="editReply"
      ></i>
      <i
        v-if="isLoggedIn && currentUser.canDeleteReply(reply, categorySlug)"
        class="action-button fas fa-trash-alt"
        @click="showConfirmDialog = true"
      ></i>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    reply: {
      type: Object,
      default: () => ({})
    },

    categorySlug: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      showConfirmDialog: false,
      content: '',
      editing: false,
      loading: false
    }
  },

  methods: {
    ...mapActions([
      'deleteReply',
      'updateReply'
    ]),

    editReply () {
      this.content = this.reply.content
      this.editing = true
    },

    async saveReply () {
      this.loading = true
      try {
        await this.updateReply({
          replyId: this.reply._id,
          data: { content: this.content }
        })
        this.editing = false
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.title
  font-size: 25px
  font-weight: 400
  color: #222

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

.reply-content
  line-height: 1.7
  color: #333
  margin-top: 20px
  font-size: 16px

.actions
  display: flex
  justify-content: flex-end
  align-items: center

.action-button
  margin-left: 15px
  color: $primaryColor
  cursor: pointer

.cancel-button
  margin-left: 5px
</style>
