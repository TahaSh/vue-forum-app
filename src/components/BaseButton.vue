<template>
  <button
    v-if="!to"
    class="base-button"
    :class="[
      theme,
      { 'disabled': disabled }
    ]"
    @click="$emit('click')"
  >
    <slot/>
  </button>
  <router-link
    v-else
    class="base-button"
    :class="[
      theme,
      { 'disabled': disabled }
    ]"
    :to="to"
  >
    <slot/>
  </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      default: null
    },

    theme: {
      type: String,
      default: 'primary'
    },

    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-button
  border: 0
  padding: 10px 15px
  border-radius: 2px
  outline: none
  cursor: pointer
  transition: 0.2s background ease-out
  text-decoration: none
  display: inline-block
  text-align: center

.base-button.disabled
  background: #D0D0D0
  color: #888
  cursor: default

// Primary
.base-button:not(.disabled).primary
  background: $primaryColor
  color: #FFF

.base-button:not(.disabled).primary:hover
  background: lighten($primaryColor, 7%)

// Borderless
.base-button:not(.disabled).borderless
  background: transparent
  color: $primaryColor

.base-button:not(.disabled).borderless:hover
  background: lighten($primaryColor, 90%)
</style>
