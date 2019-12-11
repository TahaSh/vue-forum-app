<template>
  <div class="app-page not-found-page">
    <h1>404</h1>
    <h2>
      This page doesn't exist
    </h2>
    <div class="button-section">
      <base-button
        :to="{ name: 'Home' }"
      >
        Go to Homepage
      </base-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="stylus" scoped>
h1
  text-align: center
  font-size: 100px
  font-weight: 300
  margin: 0
  color: #333

h2
  text-align: center
  font-size: 40px
  font-weight: 300
  margin: 20px 0 0
  color: #444

.button-section
  display: flex
  justify-content: center
  align-items: center
  margin-top: 50px

.base-button
  width: 200px
</style>
