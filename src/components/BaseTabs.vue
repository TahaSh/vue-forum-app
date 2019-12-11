<template>
  <div class="base-tabs">
    <div
      v-for="option in options"
      class="tab-item"
      :class="{ 'active': option.key === value }"
      :key="option.key"
      @click="$emit('input', option.key)"
    >
      {{ option.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    options: {
      type: Array,
      default: () => ([])
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-tabs
  display: flex
  align-items: center
  justify-content: center

.tab-item
  padding-bottom: 3px
  color: #444
  cursor: pointer
  border-bottom: 2px solid transparent
  transition: 0.2s all ease-out

.tab-item + .tab-item
  margin-left: 20px

.tab-item.active
  border-bottom-color: $primaryColor
  color: $primaryColor
</style>
