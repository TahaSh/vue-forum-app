<template>
  <div class="register-page app-page">
    <div class="page-form-container">
      <h1 class="page-form-title">
        Register
      </h1>
      <register-form/>
    </div>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  components: { RegisterForm }
}
</script>

<style lang="stylus" scoped>
.page-form-container
  max-width: 500px
</style>
