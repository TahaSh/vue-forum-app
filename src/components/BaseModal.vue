<template>
  <div class="base-modal">
    <transition
      name="fade"
      @after-enter="showContent = true"
      @after-leave="$emit('close')"
    >
      <div
        v-if="showOverlay"
        class="overlay"
        @click="close"
      ></div>
    </transition>
    <transition
      name="fade"
      @after-leave="showOverlay = false"
    >
      <div
        v-show="showContent"
        class="modal-container"
        :style="{ 'max-width': `${width}px` }"
      >
        <slot/>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },

    width: {
      type: Number,
      default: 500
    }
  },

  data () {
    return {
      showOverlay: false,
      showContent: false
    }
  },

  watch: {
    show: {
      immediate: true,
      handler (show) {
        this.$nextTick(() => {
          if (show) {
            this.showOverlay = true
            document.body.classList.add('no-scroll')
          } else {
            this.showContent = false
            document.body.classList.remove('no-scroll')
          }
        })
      }
    },

    showContent (showContent) {
      if (showContent) {
        this.$emit('show-content')
      }
    }
  },

  methods: {
    close () {
      this.showContent = false
      document.body.classList.remove('no-scroll')
    }
  }
}
</script>

<style lang="stylus" scoped>
.overlay
  position: fixed
  z-index: 99
  top: 0
  left: 0
  width: 100vw
  height: 100vh
  background: rgba(0,0,0,0.6)

.modal-container
  position: fixed
  top: 50%
  left: 50%
  z-index: 100
  transform: translate(-50%, -50%)
  display: flex
  justify-content: center
  align-items: center
  width: 100%

.fade-enter-active,
.fade-leave-active
  transition: all 0.15s ease

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
