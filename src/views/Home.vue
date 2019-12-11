<template>
  <div class="app-page home-page">
    <div class="header">
      <span class="title">
        Categories
      </span>
      <base-button
        v-if="isLoggedIn && currentUser.can('categories:write')"
        class="new-category-button"
        :to="{ name: 'CreateCategory' }"
      >
        <i class="fas fa-plus plus-icon"></i>
        New Category
      </base-button>
    </div>
    <categories-list/>
  </div>
</template>

<script>
import CategoriesList from '@/components/CategoriesList'
export default {
  components: { CategoriesList }
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
