<template>
  <div class="app-page create-category-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        New Category
      </h1>
      <category-form/>
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
