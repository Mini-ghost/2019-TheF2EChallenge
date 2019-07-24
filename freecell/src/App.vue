<template lang="pug">
  #app
    FreeCellTable
    Console
    LightBox(v-if="!!this.$store.state.FreeCellStore.lightBox")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

// components
import FreeCellTable from './components/FreeCellTable.vue';
import Console from './components/Console.vue';
import LightBox from './components/LightBox.vue';

import FreeCellStore from '@/FreeCellStore';

@Component({
  components: {
    FreeCellTable,
    Console,
    LightBox
  }
})
export default class App extends Vue {

  created() {
    this.$store.registerModule('FreeCellStore', FreeCellStore); // 註冊模組
  }


  // mounted() {
  //   this.isLightBoxInit = !!this.$store.state.FreeCellStore.lightBox
  // }

}
</script>

<style lang="sass">
@import ./assets/sass/variable/include
@import ./assets/sass/variable/reset

//- 文字基礎設定 => 會產生 class
@import ./assets/sass/variable/font

%full-screan
  width: 100%
  height: 100%

html
  font-family: $font
  background-color: bg-color()
  color: theme-color('font')
  letter-spacing: 1px
  overflow: hidden
  user-select: none
  @extend %full-screan

body
  @extend %full-screan

img
  width: 100%

button
  @include input-init
  letter-spacing: 1px
  cursor: pointer

#app 
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  @extend %full-screan

.container
  @include container-init(1200px, 97.5%)

.mt
  &-large
    margin-top: 5vw
  &-medium
    margin-top: 2.6042vw
  &-small
    margin-top: 1.25vw

</style>
