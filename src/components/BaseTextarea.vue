<template>
  <div
    class="base-input"
    :class="{
      'invalid': hasErrors,
      'disabled': disabled,
      'focused': focused
    }"
  >
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
    </label>
    <textarea
      :value="value"
      class="textarea"
      ref="input"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="minHeight ? { 'min-height': `${minHeight}px` } : ''"
      @input="$emit('input', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
    ></textarea>
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

    label: {
      type: String,
      default: ''
    },

    placeholder: {
      type: String,
      default: ''
    },

    minHeight: {
      type: Number,
      default: null
    },

    errors: {
      type: Object,
      default: () => ({})
    },

    errorMessages: {
      type: Object,
      default: () => ({})
    },

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      focused: false
    }
  },

  computed: {
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
    focus () {
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="stylus" scoped>
.textarea
  width: 100%
  border: 1px solid #AEAEAE
  padding: 10px
  border-radius: 2px
  outline: none
  color: #000
  transition: 0.2s all
  min-height: 300px
  resize: vertical

.base-input.disabled .textarea
  background: #FAFAFA
  color: #999

.base-input.focused .textarea
  border-color: $primaryColor

.base-input.focused .label
  color: $primaryColor

.base-input.focused .label:after
  color: $errorColor

.base-input.invalid .textarea
  border-color: $errorColor

.base-input.invalid .label
  color: $errorColor

.error-message
  color: $errorColor
  font-size: 14px
  padding: 7px 10px

.label
  font-weight: 700
  font-size: 17px
  transition: all .5s
  margin-bottom: 10px
  display: block
</style>
