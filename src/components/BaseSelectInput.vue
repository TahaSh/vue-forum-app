<template>
  <div
    class="base-select-input"
    :class="[
      theme,
      {
        transparent,
        'invalid': hasErrors,
        'loading': loadingOptions
      }
    ]"
  >
    <div
      class="current-value"
      ref="currentValue"
      @click="showDropdown = !loadingOptions"
    >
      <span
        v-if="loadingOptions"
        class="current-value-text"
      >
        Loading...
      </span>
      <span
        v-else-if="value"
        class="current-value-text"
      >
        {{ currentTitle }}
      </span>
      <span
        v-else
        class="placeholder"
      >
        {{ placeholder }}
      </span>
      <i class="fas fa-angle-down arrow-icon"></i>
    </div>
    <base-dropdown-content
      :show="showDropdown"
      v-closable="{
        handler: 'closeDropdown',
        exclude: ['currentValue']
      }"
      :options="options"
      :selected="value"
      :show-selected-first="true"
      :y-direction="yDirection"
      :x-direction="xDirection"
      @select="onSelect"
    />
    <div
      v-if="hasErrors"
      class="error-message"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import validationMessages from '@/lib/validationMessages'

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },

    options: {
      type: Array,
      default: () => ([])
    },

    placeholder: {
      type: String,
      default: ''
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

    errors: {
      type: Object,
      default: () => ({})
    },

    errorMessages: {
      type: Object,
      default: () => ({})
    },

    loadingOptions: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showDropdown: false
    }
  },

  computed: {
    currentTitle () {
      const option = this.options.find(option => option.key === this.value)
      return option ? option.title : ''
    },

    hasErrors () {
      return this.errors.$anyError
    },

    errorMessage () {
      const allRules = Object.keys(this.errors.$params)
      const invalidRules = allRules.filter(rule => {
        return !this.errors[rule]
      })
      if (!invalidRules.length) {
        return null
      }
      const currentRule = invalidRules[0]

      return this.errorMessages[currentRule]
        ? this.errorMessages[currentRule]
        : validationMessages[currentRule]
    }
  },

  methods: {
    closeDropdown () {
      this.showDropdown = false
    },

    onSelect (optionKey) {
      this.$emit('input', optionKey)
      this.closeDropdown()
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-select-input
  position: relative

.current-value
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px
  border: 1px solid #AEAEAE
  cursor: pointer
  user-select: none
  border-radius: 2px
  background: #FFF
  color: #000

.placeholder
  color: #999

.base-select-input.transparent .current-value
  background: transparent
  border: none

.base-select-input.light .current-value
  color: #FFF

.arrow-icon
  color: #444
  margin-left: 10px

.base-select-input.light .arrow-icon
  color: #F0F0F0

.base-select-input.invalid .current-value
  border-color: $errorColor

.base-select-input.invalid .label
  color: $errorColor

.error-message
  color: $errorColor
  font-size: 14px
  padding: 7px 10px

.base-select-input.loading .current-value
  background: #F7F7F7
  cursor: default

.base-select-input.loading .current-value-text
  color: #888

</style>
