<template>
  <div
    class="base-image-cropper"
    @mousedown.prevent="onMousedown"
    @touchstart.prevent="onMousedown"
    @wheel.prevent="onWheel"
  >
    <div
      v-show="loading"
      class="loading-view"
    >
      <div class="loading-content">
        Loading...
      </div>
    </div>
    <div
      v-show="!loading"
      class="content"
      ref="container"
    >
      <button
        class="save-button"
        @click="crop"
        @touchstart.stop
      >
        Save
      </button>
        <div
          class="crop-area"
          ref="cropArea"
          :style="{
            'width': `${cropWidth}px`,
            'height': `${cropHeight}px`,
            'transform': `translate3d(-50%, -50%, 0) scale(${cropScale})`
          }"
        ></div>
        <img
          v-if="showImage"
          class="image"
          ref="image"
          crossorigin="anonymous"
          :src="src"
          :style="{
            'transform': `translate3d(${translate.x}px, ${translate.y}px, 0) scale(${scale})`,
            'transform-origin': `${origin.x}px ${origin.y}px`
          }"
          @load="init"
        >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: ''
    },

    cropWidth: {
      type: Number,
      default: 300
    },

    cropHeight: {
      type: Number,
      default: 300
    }
  },

  data () {
    return {
      loading: true,
      showImage: false,
      dragging: false,
      startX: 0,
      startY: 0,
      translate: { x: 0, y: 0 },
      origin: { x: 'center', y: 'center' },
      scale: 1,
      maxScale: 1,
      minScale: 1,
      cropScale: 1,
      startTouchDistance: 0
    }
  },

  mounted () {
    window.addEventListener('mousemove', this.onMousemove)
    window.addEventListener('touchmove', this.onMousemove)
    window.addEventListener('mouseup', this.onMouseup)
    window.addEventListener('touchend', this.onMouseup)
    window.addEventListener('resize', this.onResize)
    setTimeout(() => {
      this.showImage = true
    }, 150)
  },

  beforeDestroy () {
    window.removeEventListener('mousemove', this.onMousemove)
    window.removeEventListener('touchmove', this.onMousemove)
    window.removeEventListener('mouseup', this.onMouseup)
    window.removeEventListener('touchend', this.onMouseup)
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    init () {
      this.loading = false
      this.$nextTick(() => {
        if (!this.$refs.image) {
          return
        }
        const containerRect = this.getContainerRect()
        this.updateCropScale()
        this.maxScale = this.$refs.image.naturalWidth / this.$refs.image.width
        this.minScale = this.cropWidth < containerRect.width && this.cropHeight < containerRect.height
          ? Math.max(this.cropWidth / this.$refs.image.width, this.cropHeight / this.$refs.image.height)
          : 1

        this.scale = this.maxScale
        this.translate.y = (this.getCropRect().top - this.getImageRect().top) - (this.getImageRect().height - this.getCropRect().height) / 2
      })
    },

    getContainerRect () {
      return this.$refs.container.getBoundingClientRect()
    },

    getImageRect () {
      if (!this.$refs.image) {
        return { width: this.cropWidth, height: this.cropHeight }
      }
      return this.$refs.image.getBoundingClientRect()
    },

    getCropRect () {
      return this.$refs.cropArea.getBoundingClientRect()
    },

    updateCropScale () {
      const containerRect = this.getContainerRect()
      this.cropScale = this.cropWidth < containerRect.width && this.cropHeight < containerRect.height
        ? 1
        : Math.min(containerRect.width / this.cropWidth, containerRect.height / this.cropHeight)
    },

    onResize () {
      this.init()
      this.$nextTick(() => {
        this.onZoom()
      })
    },

    onZoom () {
      const boundaries = this.getBoundaries()
      if (this.translate.x >= boundaries.translate.maxX) {
        this.translate.x = boundaries.translate.maxX
        this.origin.x = boundaries.origin.minX
      }

      if (this.translate.x <= boundaries.translate.minX) {
        this.translate.x = boundaries.translate.minX
        this.origin.x = boundaries.origin.maxX
      }

      if (this.translate.y >= boundaries.translate.maxY) {
        this.origin.y = boundaries.origin.minY
        this.translate.y = boundaries.translate.maxY
      }

      if (this.translate.y <= boundaries.translate.minY) {
        this.origin.y = boundaries.origin.maxY
        this.translate.y = boundaries.translate.minY
      }
    },

    onMousemove (e) {
      if (e.type === 'touchmove' && e.touches.length === 2) {
        const endTouchDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        )
        const touchesDelta = endTouchDistance - this.startTouchDistance
        this.onPinch(touchesDelta)
      } else if (this.dragging) {
        this.updateOrigin()
        const boundaries = this.getBoundaries()
        const clientX = e.type === 'touchmove'
          ? e.touches[0].clientX
          : e.clientX
        const clientY = e.type === 'touchmove'
          ? e.touches[0].clientY
          : e.clientY
        let newXPosition = clientX + this.startX
        let newYPosition = clientY + this.startY

        if (newXPosition >= boundaries.translate.maxX) {
          newXPosition = boundaries.translate.maxX
        }

        if (newXPosition <= boundaries.translate.minX) {
          newXPosition = boundaries.translate.minX
        }

        if (newYPosition >= boundaries.translate.maxY) {
          newYPosition = boundaries.translate.maxY
        }

        if (newYPosition <= boundaries.translate.minY) {
          newYPosition = boundaries.translate.minY
        }
        this.translate.x = newXPosition
        this.translate.y = newYPosition
      }
    },

    onMousedown (e) {
      this.dragging = true
      const clientX = e.type === 'touchstart'
        ? e.touches[0].clientX
        : e.clientX
      const clientY = e.type === 'touchstart'
        ? e.touches[0].clientY
        : e.clientY
      this.startX = this.translate.x - clientX
      this.startY = this.translate.y - clientY
      if (e.type === 'touchstart' && e.touches.length === 2) {
        this.startTouchDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        )
      }
    },

    onMouseup () {
      this.dragging = false
      this.updateOrigin()
    },

    onWheel (e) {
      let delta
      if (e.wheelDelta) {
        delta = e.wheelDelta / 1200
      } else if (e.deltaY) {
        delta = e.deltaY / 1060
      } else if (e.detail) {
        delta = e.detail / -60
      } else {
        delta = 0
      }
      const newScale = this.scale + (delta * this.scale)
      this.scale = newScale <= this.minScale
        ? this.minScale
        : newScale > this.maxScale
          ? this.maxScale
          : newScale
      this.$nextTick(() => {
        this.onZoom()
      })
    },

    onPinch (delta) {
      const newScale = this.scale + (delta / 1200 * this.scale)
      this.scale = newScale <= this.minScale
        ? this.minScale
        : newScale > this.maxScale
          ? this.maxScale
          : newScale
      this.$nextTick(() => {
        this.onZoom()
      })
    },

    getBoundaries () {
      const scale = this.scale
      const cropAreaWidth = this.getCropRect().width
      const cropAreaHeight = this.getCropRect().height
      const centerFromBoundaryX = this.$el.clientWidth / 2
      const centerFromBoundaryY = this.$el.clientHeight / 2
      const imgRect = this.getImageRect()
      const curImgWidth = imgRect.width
      const curImgHeight = imgRect.height
      const halfWidth = cropAreaWidth / 2
      const halfHeight = cropAreaHeight / 2

      const maxX = ((halfWidth / scale) - centerFromBoundaryX) * -1
      const minX = maxX - ((curImgWidth * (1 / scale)) - (cropAreaWidth * (1 / scale)))

      const maxY = ((halfHeight / scale) - centerFromBoundaryY) * -1
      const minY = maxY - ((curImgHeight * (1 / scale)) - (cropAreaHeight * (1 / scale)))

      const originMinX = (1 / scale) * halfWidth
      const originMaxX = (curImgWidth * (1 / scale)) - originMinX

      const originMinY = (1 / scale) * halfHeight
      const originMaxY = (curImgHeight * (1 / scale)) - originMinY

      return {
        translate: {
          maxX: maxX,
          minX: minX,
          maxY: maxY,
          minY: minY
        },

        origin: {
          maxX: originMaxX,
          minX: originMinX,
          maxY: originMaxY,
          minY: originMinY
        }
      }
    },

    crop () {
      const canvasEl = document.createElement('canvas')
      canvasEl.style.display = 'none'
      this.$el.appendChild(canvasEl)
      const ctx = canvasEl.getContext('2d')
      canvasEl.width = this.cropWidth
      canvasEl.height = this.cropHeight
      const ratio = this.$refs.image.naturalWidth / this.$refs.image.width
      ctx.drawImage(
        this.$refs.image,
        (this.$refs.image.naturalWidth / 2) - (this.getCropRect().width * ratio / this.scale / 2) - (this.translate.x * ratio),
        (this.$refs.image.naturalHeight / 2) - (this.getCropRect().height * ratio / this.scale / 2) - (this.translate.y * ratio) + ((Math.round(this.getContainerRect().height) - this.$refs.image.height) * ratio / 2),
        this.getCropRect().width * ratio / this.scale,
        this.getCropRect().height * ratio / this.scale,
        0, 0, this.cropWidth, this.cropHeight
      )
      this.$nextTick(() => {
        const dataURL = canvasEl.toDataURL('image/png')
        this.$emit('crop', dataURL)
      })
    },

    updateOrigin () {
      const cropAreaBoundingRect = this.$refs.cropArea.getBoundingClientRect()
      const imageBoundingRect = this.$refs.image.getBoundingClientRect()
      const previousOrigin = this.origin
      this.origin.x = ((cropAreaBoundingRect.left - imageBoundingRect.left) + (cropAreaBoundingRect.width / 2)) / this.scale
      this.origin.y = ((cropAreaBoundingRect.top - imageBoundingRect.top) + (cropAreaBoundingRect.height / 2)) / this.scale
      this.translate.x -= (this.origin.x - previousOrigin.x) * (1 - this.scale)
      this.translate.y -= (this.origin.y - previousOrigin.y) * (1 - this.scale)
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  background: #222
  width: 100%
  height: 100%
  overflow: hidden
  position: relative
  display: block
  cursor: move
  border-radius: 3px

.image
  max-width: 100%
  display: flex
  pointer-events: all

.image-container
  position: relative

.crop-area
  position: absolute
  left: 50%
  top: 50%
  z-index: 1
  transform: translate(-50%, -50%)
  border: 2px solid rgba(255, 255, 255, 0.8)
  box-shadow: 0 0 2000px 2000px rgba(0, 0, 0, 0.8)
  pointer-events: none

.save-button
  height: 35px
  padding: 0 20px
  border: none
  border-radius: 35px
  background: #2288AA
  color: #FFF
  cursor: pointer
  position: absolute
  top: 10px
  right: 10px
  z-index: 2
  display: flex
  justify-content: center
  align-items: center
  font-size: 16px
  font-family: 'Helvetica'
  outline: 0
  transition: 0.2s background ease-out
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  font-weight: 500

.save-button:hover
  background: lighten(#2288AA, 10%)

.loading-view
  position: absolute
  z-index: 1
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: #222
  border-radius: 3px
  color: #FFF
  display: flex
  justify-content: center
  align-items: center
  font-size: 20px

.loading-content
  background: rgba(255, 255, 255, 0.1)
  padding: 10px 20px
  display: flex
  align-items: center
  border-radius: 24px
</style>
