<template>
  <div class="app-page edit-category-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        Edit Category
      </h1>
      <category-form
        :category-slug="$route.params.categorySlug"
        :update="true"
      />
    </div>
  </div>
</template>

<script>
import CategoryForm from '@/components/CategoryForm'

export default {
  components: { CategoryForm }
}
</script>

<style lang="stylus" scoped>
</style>
