<template>
  <div
    class="base-input"
    :class="{
      'invalid': hasErrors,
      'disabled': disabled,
      'required': required,
      'focus': focus
    }"
  >
    <label
      v-if="label"
      class="label"
    >
      {{ label }}
    </label>
    <input
      :value="value"
      class="input"
      :class="type"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="$emit('input', $event.target.value)"
      @focus="focus = true"
      @blur="focus = false"
    >
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

    type: {
      type: String,
      default: 'text'
    },

    minHeight: {
      type: Number,
      default: null
    },

    required: {
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

    disabled: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      focus: false
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
  }
}
</script>

<style lang="stylus" scoped>
.input
  width: 100%
  border: 1px solid #AEAEAE
  padding: 10px
  border-radius: 2px
  outline: none
  color: #000
  transition: 0.2s all

.base-input.focus .input
  border-color: $primaryColor

.base-input.focus .label
  color: $primaryColor

.base-input.focus .label:after
  color: $errorColor

.base-input.invalid .input
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
