<template>
  <div class="app-page login-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        Login
      </h1>
      <login-form/>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  components: { LoginForm }
}
</script>

<style lang="stylus" scoped>
.page-form-container
  max-width: 500px
</style>
