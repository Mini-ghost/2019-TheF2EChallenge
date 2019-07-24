<template lang="pug">
  .lightBox
    .lightBox-container
      .lightBox-wrap
        .lightBox-close(@click="closeLightBoxHandler")
        img.lightBox-image(src="./../assets/image/king_happy.png")
        .lightBox-title.fz-20.fw-bold {{lightBoxData.title}}
        .lightBox-message.fz-14(v-html="lightBoxData.message")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class CardBlock extends Vue {

  lightBoxData: any = this.$store.state.FreeCellStore.lightBox

  created() {
    
  }

  closeLightBoxHandler() {
    this.$store.commit('FreeCellStore/SET_LIGHTBOX', null)
  }

}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.lightBox
  position: fixed
  top: 0
  right: 0
  bottom: 0
  left: 0
  z-index: 9999
  background-color: rgba(bg-color(secondary), .7)
  &-wrap
    @include flex
    @include absCenter
    flex-direction: column
    max-width: 600px
    max-height: 520px
    width: 95%
    background-color: #fefefe
    padding: 50px
    box-shadow: 0 0 10px rgba(bg-color(secondary), .2)
    border:
      radius: 10px
  &-close
    position: absolute
    top: 30px
    right: 30px
    width: 24px
    height: 24px
    border-radius: 50%
    cursor: pointer
    &:before, &:after
      content: ""
      position: absolute
      height: 2px
      width: 80%
      background-color: bg-color(secondary)
      top: 50%
      left: 50%
    &:before
        transform: translate(-50%, -50%) rotate(45deg)
    &:after
        transform: translate(-50%, -50%) rotate(-45deg)
  &-image
    display: block
    width: 60px
    margin: 0 auto
  &-title
    margin: 1rem 0
    text-align: center
  &-message                                                                                                                                                                                                                                                                     
    @include scrollbar(#ddd)
    @include isoScrolling
    padding: 10px
    &__p
      line-height: 1.8
      & + &
        margin-top: 20px
  
</style>
