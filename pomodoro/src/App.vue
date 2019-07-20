<template lang="pug">
  #app
    NavBlock(:nav-list="navList")
    MainBlock
    
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// components
import NavBlock from './components/NavBlock.vue';
import MainBlock from './components/MainBlock.vue'

// icon-font css
require('./assets/icons/icons.css')

@Component({
  components: {
    NavBlock,
    MainBlock
  }
})
export default class App extends Vue {

  // async mounted() {
  //   await this.$store.dispatch('GETTASK')
  // }

  get navList() {
    return this.$store.state.navList
  }

}
</script>

<style lang="sass">
@import ./assets/sass/variable/include
@import ./assets/sass/variable/reset

//- 文字基礎設定 => 會產生 class
@import ./assets/sass/variable/font

%input-init
  @include input-init

html
    font-family: $font
    background-color: bg-color()
    color: theme-color('font')
    overflow: hidden

hr
  margin: 0
  border: none

input
  @extend %input-init

button
  @extend %input-init
  cursor: pointer

#app
  @include flex
  flex-direction: row-reverse

.container
  @include container-init

.mt
  &-large
    margin-top: 5vw
  &-medium
    margin-top: 2.6042vw
  &-small
    margin-top: 1.25vw

</style>
