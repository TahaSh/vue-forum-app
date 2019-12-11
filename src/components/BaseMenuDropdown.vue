<template>
  <div
    class="base-menu-dropdown"
    :class="[
      theme,
      {
        transparent,
        'use-button': useButton
      }
    ]"
  >
    <base-button
      v-if="useButton"
      ref="triggerButton"
      type="bar"
      :transparent="transparent"
      :theme="theme"
      @click="showDropdown = !showDropdown"
    >
      <slot/>
    </base-button>
    <div
      v-else
      ref="triggerButton"
      @click="showDropdown = !showDropdown"
    >
      <slot/>
    </div>
    <base-dropdown-content
      v-slot="{ option }"
      :show="showDropdown"
      v-closable="{
        handler: 'closeDropdown',
        exclude: ['triggerButton']
      }"
      :options="options"
      :x-direction="xDirection"
      :y-direction="yDirection"
      :max-height="maxHeight"
      @select="onSelect"
    >
      <slot
        name="option"
        :option="option"
      />
    </base-dropdown-content>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: () => ([])
    },

    useButton: {
      type: Boolean,
      default: false
    },

    yDirection: {
      type: String,
      default: 'below'
    },

    xDirection: {
      type: String,
      default: 'right'
    },

    theme: {
      type: String,
      default: 'dark'
    },

    transparent: {
      type: Boolean,
      default: false
    },

    maxHeight: {
      type: Number,
      default: 200
    }
  },

  data () {
    return {
      showDropdown: false
    }
  },

  methods: {
    closeDropdown () {
      this.showDropdown = false
    },

    onSelect (optionKey) {
      this.$emit('select', optionKey)
      this.closeDropdown()
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-menu-dropdown
  position: relative

.base-menu-dropdown:not(.use-button) .base-dropdown-content
  top: calc(100% + 10px)
</style>

<style lang="stylus">
.base-menu-dropdown .base-dropdown-content .option
  border: none
</style>
