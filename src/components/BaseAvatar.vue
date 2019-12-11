<template>
  <div
    class="base-avatar"
    :class="{ 'name': !src }"
    :style="{
      'background-image': `url(${src})`,
      'background-color': !src ? backgroundColor : '',
      'width': `${size}px`,
      'min-width': `${size}px`,
      'height': `${size}px`,
      'min-height': `${size}px`
    }"
  >
    <span
      v-if="!src && name"
      class="name-letter"
      :style="{
        'font-size': `${.45 * size}px`
      }"
    >
      {{ name[0] }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: null
    },

    name: {
      type: String,
      default: ''
    },

    size: {
      type: Number,
      default: 40
    }
  },

  computed: {
    backgroundColor () {
      const name = this.name.toUpperCase()
      const hue = name.split('').reduce((acc, cur, index) => {
        acc += name.charCodeAt(index)
        return acc
      }, 0)
      return `hsl(${hue % 360}, 60%, 50%)`
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-avatar
  border-radius 50%
  background-position 50% 50%
  background-size cover
  background-repeat no-repeat
  position: relative

.base-avatar.name
  display flex
  align-items: center
  justify-content center

.name-letter
  color: #FFF
  font-size: 18px
  font-weight bold
  user-select none
  text-transform uppercase
</style>
