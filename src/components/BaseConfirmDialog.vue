<template>
  <base-modal
    :show="show"
    class="base-confirm-dialog"
    :width="500"
    @close="$emit('dismiss')"
  >
    <div class="modal-content">
      <h1 class="title">
        <slot name="title"/>
      </h1>
      <div class="content">
        <slot/>
        <div class="actions">
          <base-button
            theme="borderless"
            @click="show = false"
          >
            {{ dismissButtonTitle }}
          </base-button>
          <base-button
            class="confirm-button"
            @click="confirm"
          >
            {{ confirmButtonTitle }}
          </base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>

<script>
export default {
  props: {
    confirmButtonTitle: {
      type: String,
      default: 'Confirm'
    },

    dismissButtonTitle: {
      type: String,
      default: 'Dismiss'
    }
  },

  data () {
    return {
      show: false
    }
  },

  mounted () {
    this.show = true
  },

  methods: {
    confirm () {
      this.$emit('confirm')
      this.show = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.modal-content
  border-radius: 3px
  box-shadow: 0 1px 5px rgba(0,0,0,0.3)
  width: calc(100% - 10px)
  display: flex
  flex-direction: column

.title
  padding: 10px 20px
  margin: 0
  width: 100%
  background: $primaryColor
  color: #FFF
  font-size: 25px
  font-weight: 300
  border-radius: 3px 3px 0 0

.content
  padding: 20px
  background: #FFF
  border-radius: 0 0 3px 3px
  line-height: 1.3

.actions
  display: flex
  justify-content: flex-end
  align-items: center
  margin-top: 20px

.confirm-button
  margin-left: 10px

.base-button
  text-transform: uppercase
</style>
