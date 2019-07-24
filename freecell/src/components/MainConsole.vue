<template lang="pug">
  aside.console
    .console-container.container
      .console-scoring
        .console-scoring__item.console-scoring__image
          img(src='./../assets/image/info.svg', alt="FreeCell Rule")
        .console-scoring__item.console-scoring__time.fz-14.fw-bold TIME：00:00
        .console-scoring__item.console-scoring__score.fz-14.fw-bold SCORE：100
      .console-button.button
        .button-group.fz-12.fw-bold
          button.button-group__item NEW GAME
          button.button-group__item RESTART
          button.button-group__item HINT
          button.button-group__item UNDO
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class MainConsole extends Vue {}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.console
  position: absolute
  bottom: 0
  left: 0
  right: 0
  width: 100%
  &-container
    display: flex
    justify-content: space-between
    border-top: 1px solid #cccccc
    padding: 20px 0
  &-scoring
    display: flex
    align-items: center
    &__item
      display: inline-block
      & + &
        margin-left: 0.78125vw
    &__image
      width: 40px
      height: 40px
      border: 2px solid theme-color('font')
        radius: 50%
      padding: 0.5rem
      cursor: pointer

.button
  &-group
    &__item
      min-width: 120px
      background-color: bg-color('secondary')
      color: white
      padding: 14px
      border-radius: 50px
      transition: .3s
      & + &
        margin-left: 0.78125vw
      &:hover
        background-color: #ffb53e

</style>
