<template>
  <div class="base-image-input">
    <div
      class="content"
      :class="{ 'has-image': imagePreviewData }"
      :style="{
        'width': `${width}px`,
        'height': `${height}px`,
        'background-image': `url(${imagePreviewData})`
      }"
      @click="chooseImage"
    >
      <input
        class="file-input"
        ref="fileInput"
        type="file"
        @change="onSelectFile"
      >
      <span class="placeholder">
        <i class="fas fa-image placeholder-icon"></i>
        <span class="placeholder-text">
          {{ imagePreviewData ? 'Change Your Picture' : 'Choose Picture' }}
        </span>
      </span>
    </div>
    <base-modal
      :show="showCropperModal"
      class="image-cropper-modal"
      :width="700"
      @close="closeCropper"
      @show-content="showCropper = true"
    >
      <base-image-cropper
        v-if="showCropper"
        :src="imageToCropData"
        :crop-width="width"
        :crop-height="height"
        @crop="onCrop"
      />
    </base-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },

    width: {
      type: Number,
      default: 300
    },

    height: {
      type: Number,
      default: 300
    },

    crop: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      imagePreviewData: this.value,
      imageToCropData: null,
      showCropperModal: false,
      showCropper: false
    }
  },

  methods: {
    chooseImage () {
      this.$refs.fileInput.click()
    },

    onSelectFile () {
      const input = this.$refs.fileInput
      const files = input.files
      if (files && files[0]) {
        const reader = new FileReader()
        reader.onload = e => {
          if (this.crop) {
            this.imageToCropData = e.target.result
            this.showCropperModal = true
          } else {
            this.imagePreviewData = e.target.result
            this.$emit('input', this.imagePreviewData)
          }
        }
        reader.readAsDataURL(files[0])
      }
    },

    onCrop (imageData) {
      this.imagePreviewData = imageData
      this.$emit('input', imageData)
      this.closeCropper()
    },

    closeCropper () {
      this.showCropperModal = false
      this.showCropper = false
      this.$refs.fileInput.value = ''
    }
  }
}
</script>

<style lang="stylus" scoped>
.content
  background-color: #F0F0F0
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  border-radius: 3px
  background-size: cover
  background-position: center
  transition: 0.2s background-color ease-out

.content:hover
  background-color: #E9E9E9

.file-input
  display: none

.placeholder
  color: rgba(0, 0, 0, 0.3)
  font-weight: bold
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  position: relative

.content.has-image
  position: relative

.content.has-image:after
  content: ''
  position: absolute
  z-index: 1
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: rgba(0, 0, 0, 0.3)
  transition: 0.2s background ease-out

.content.has-image:hover:after
  background: rgba(0, 0, 0, 0.2)

.content.has-image .placeholder
  color: rgba(255, 255, 255, 0.7)
  z-index: 2

.placeholder-text
  font-size: 20px
  margin-top: 10px

.placeholder-icon
  font-size: 40px

.base-image-cropper
  width: 100%
  height: 100%
</style>

<style lang="stylus">
.image-cropper-modal .modal-container
  max-height: 700px
  height: calc(100% - 100px)
</style>
