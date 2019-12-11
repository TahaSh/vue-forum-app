<template>
  <div class="category-item">
    <base-confirm-dialog
      v-if="showConfirmDialog"
      confirm-button-title="delete"
      dismiss-button-title="cancel"
      @dismiss="showConfirmDialog = false"
      @confirm="deleteCategory({ categorySlug: category.slug })"
    >
      <template #title>
        Delete this category?
      </template>
      <template #default>
        Deleting this category will also delete all the topics it contains. Note that you cannot undo this action.
      </template>
    </base-confirm-dialog>
    <router-link
      class="category-item-link"
      :to="{ name: 'Category', params: { categorySlug: category.slug } }"
      :style="{ 'border-color': category.color }"
    >
      <div class="content">
        <h1 class="title">
          {{ category.title }}
        </h1>
        <p class="description">
          {{ category.description }}
        </p>
      </div>
      <div class="actions">
        <router-link
          v-if="isLoggedIn && currentUser.can('categories:write')"
          :to="{ name: 'EditCategory', params: { categorySlug: category.slug } }"
        >
          <i
            class="action-button fas fa-pencil-alt"
          ></i>
        </router-link>
        <i
          v-if="isLoggedIn && currentUser.can('categories:delete')"
          class="action-button fas fa-trash-alt"
          @click.prevent.stop="showConfirmDialog = true"
        ></i>
      </div>
    </router-link>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: {
    category: {
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
    ...mapActions(['deleteCategory'])
  }
}
</script>

<style lang="stylus" scoped>
.category-item-link
  background: #FFF
  padding: 15px
  cursor: pointer
  transition: 0.2s background ease-out
  border-left: 5px solid
  box-shadow: 0 1px 5px 0 hsla(0, 0, 0, 0.2)
  border-radius: 4px
  display: flex
  text-decoration: none
  justify-content: space-between

.category-item:hover
  background: #F9F9F9

.title
  font-size: 20px
  margin: 0
  font-weight 400
  color: #000

.description
  color: #999
  margin: 10px 0 0

.actions
  display: flex
  justify-content: flex-end
  align-items: center

.action-button
  margin-left: 15px
  color: $primaryColor
  cursor: pointer

.action-button:hover
  color: lighten($primaryColor, 20%)

</style>
