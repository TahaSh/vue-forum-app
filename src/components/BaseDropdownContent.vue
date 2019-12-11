<template>
  <transition name="fade-up">
    <div
      v-show="show"
      class="base-dropdown-content"
      :class="[xDirection, yDirection]"
    >
      <div
        v-if="status === 'loading'"
        class="loading"
      >
        Fetching results
      </div>
      <div
        v-else-if="status === 'empty'"
        class="empty"
      >
        No results found
      </div>
      <ul
        v-else-if="status === 'displayOptions'"
        class="options"
        ref="options"
        :style="{
          'max-height': `${maxHeight}px`
        }"
      >
        <li
          v-for="(option, index) in orderedOptions"
          :key="option.key"
          class="option"
          :class="{
            'selected': option.key === selected,
            'highlighted': index === highlightedIndex
          }"
          @mouseenter="highlightedIndex = index"
          @click="onSelect"
        >
          <slot :option="option">
            {{ option.title }}
          </slot>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },

    options: {
      type: Array,
      default: () => ([])
    },

    status: {
      type: String,
      default: 'displayOptions'
    },

    selected: {
      type: [String, Number],
      default: ''
    },

    showSelectedFirst: {
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

    searchValue: {
      type: String,
      default: ''
    },

    maxHeight: {
      type: Number,
      default: 200
    }
  },

  data () {
    return {
      highlightedIndex: -1
    }
  },

  computed: {
    orderedOptions () {
      const filteredOptions = this.options.filter(({ title }) => (new RegExp(this.searchValue)).test(title))
      if (this.showSelectedFirst && this.selected) {
        let orderedOptions = filteredOptions.filter(option => option.key !== this.selected)
        const selectedOption = filteredOptions.find(option => option.key === this.selected)
        return this.yDirection === 'below'
          ? [selectedOption, ...orderedOptions]
          : [...orderedOptions, selectedOption]
      }
      return filteredOptions
    }
  },

  mounted () {
    document.body.addEventListener('keydown', this.onKeyDown)
  },

  beforeDestroy () {
    document.body.removeEventListener('keydown', this.onKeyDown)
  },

  watch: {
    show () {
      this.highlightedIndex = -1
    }
  },

  methods: {
    onKeyDown (e) {
      if (!this.show) {
        return
      }
      if (e.keyCode === 40 || e.keyCode === 38 || e.keyCode === 13) {
        e.preventDefault()
      }
      if (e.keyCode === 40) {
        this.moveDown()
      } else if (e.keyCode === 38) {
        this.moveUp()
      } else if (e.keyCode === 13) {
        this.onSelect()
      }
    },

    onSelect () {
      const option = this.orderedOptions.find(
        (option, index) => index === this.highlightedIndex
      )
      if (option) {
        this.$emit('select', option.key)
      }
    },

    moveDown () {
      this.highlightedIndex = (this.highlightedIndex + 1) % this.orderedOptions.length
      this.$nextTick(() => {
        if (this.highlightedIndex === 0) {
          this.$refs.options.scrollTo(0, 0)
          return
        }
        const highlightedEl = this.$el.querySelector('.highlighted')
        const highlightedElBottom = highlightedEl.getBoundingClientRect().bottom
        const optionsElBottom = this.$refs.options.getBoundingClientRect().bottom
        if (highlightedElBottom > optionsElBottom) {
          this.$refs.options.scrollTo(0, (highlightedElBottom - optionsElBottom) + this.$refs.options.scrollTop)
        }
      })
    },

    moveUp () {
      this.highlightedIndex = (this.highlightedIndex - 1) < 0
        ? this.orderedOptions.length - 1
        : this.highlightedIndex - 1
      this.$nextTick(() => {
        const optionsElRect = this.$refs.options.getBoundingClientRect()
        if (this.highlightedIndex === this.orderedOptions.length - 1) {
          this.$refs.options.scrollTo(0, this.$refs.options.scrollHeight)
          return
        }
        const highlightedEl = this.$el.querySelector('.highlighted')
        const highlightedElTop = highlightedEl.getBoundingClientRect().top
        if (highlightedElTop < optionsElRect.top) {
          this.$refs.options.scrollTo(0, this.$refs.options.scrollTop - (optionsElRect.top - highlightedElTop))
        }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.base-dropdown-content
  position: absolute
  width: 100%
  min-width: max-content
  z-index: 99999
  background: #FFF
  box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)
  border-radius: 0 0 2px 2px

.base-dropdown-content.below
  top: 0

.base-dropdown-content.above
  bottom: 0

.base-dropdown-content.right
  left: 0

.base-dropdown-content.left
  right: 0

.options
  list-style: none
  padding: 0
  margin: 0
  overflow: auto

.option
  padding: 15px
  font-size: 14px
  color: #444
  cursor: pointer
  transition: 0.2s background ease-out

.option.selected
  color: $primaryColor

.option.highlighted
  background: #F2F2F2

.option + .option
  border-top: 1px solid #F0F0F0

.loading
  padding: 20px
  display: flex
  justify-content: center
  align-items: center

.empty
  padding: 20px
  display: flex
  justify-content: center
  align-items: center

.fade-up-enter-active,
.fade-up-leave-active
  transition: all 0.3s ease

.fade-up-enter,
.fade-up-leave-to
  opacity: 0
  transform: translate3d(0, 5%, 0)
</style>
