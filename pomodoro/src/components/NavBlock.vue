<template lang="pug">
  nav.nav
    .nav-container
      .nav-bar
        transition-group(
          tag="ul", 
          class="nav-group fz-26",
          name="slide-right-bar",
          v-on:after-enter="afterEnterHandler($event)",
          appear
        )
          li.nav-group__item( 
              v-for="(item, id) in navList", 
              :style="navGroupItemStyle(id)"
              :class="activeHandler(item)", 
              @click="selectHandler(item)",
              :key="item"
            )
            i(:class="'icon-' + item")
        .nav-ctrl(@click="ctrlClickHandler")
          img.nav-ctrl__img(src="./../assets/images/tomato_small_color.svg")
          i.icon-arrow.nav-ctrl__arrow.fz-20(:class="arrowClass") 
      transition(name="slide-right-content", appear)
        transition-group(tag="div", class="nav-content", name="fade-in-content", v-show="initActive", appear)
          TaskAdd.nav-section(v-show="showHandler('add')", key="add")
          TaskList.nav-section(v-show="showHandler('list')", key="list")
          Analytics.nav-section(v-show="showHandler('analysis')", key="analysis")
          Ringtone.nav-section(v-show="showHandler('ringtone')", key="ringtone")

        
</template>

<script lang="ts">
import { Watch, Component, Prop, Vue } from 'vue-property-decorator';

// components
import TaskAdd from './TaskAdd.vue'
import TaskList from './TaskList.vue'
import Analytics from './Analytics.vue'
import Ringtone from './Ringtone.vue'

@Component({
  components: {
    TaskAdd,
    TaskList,
    Analytics,
    Ringtone
  }
})
export default class NavBlock extends Vue {
  @Prop() private navList!: string[];

  initActive: string | null = null

  activeHandler(str: string) {
    return (str === this.initActive)? 'nav-group__item--active' : ''
  }

  selectHandler(str: string) {
    if(this.initActive === str) return this.initActive = null
    this.initActive = str
  }

  afterEnterHandler(el: any) {
    el.style.transitionDelay = null
  }

  showHandler(section: string) {
    return (section === this.initActive)
  }

  navGroupItemStyle(id: number) {
    return `transition-delay: ${id * 0.15}s;`
  }

  ctrlClickHandler() {
    if(this.initActive) return this.initActive = null
    this.initActive = this.navList[0]
  }

  get isNavActive() {
    return (this.initActive === null)? false : true
  }

  get arrowClass() {
    return (this.initActive === null)? 
      'nav-ctrl__arrow--left' : 
      'nav-ctrl__arrow--right';
  }
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

%abs-center
  @include absCenter

%transition
  transition: .3s

.nav
  height: 100vh
  max-width: 100%
  background-color: bg-color(secondary)
  color: $white
  &-container
    +flex()
    height: 100%
  &-bar
    +flex(space-between)
    flex-direction: column
    width: 82px
    height: 100%
    border-right: 2px solid #434343
  &-group
    text-align: center
    &__item
      +flexCenter
      width: 100%
      height: 80px
      cursor: pointer
      @extend %transition
      &:hover
        background-color: lighten(bg-color(secondary), 10%)
      &--active
        color: theme-color()
  &-ctrl
    position: relative
    width: 90px
    height: 50px
    border-radius: 25px 5px 5px 25px
    background-color: $white
    color: theme-color(font)
    right: 30px
    margin-bottom: 30px
    cursor: pointer
    user-select: none
    &__img
      @include absCenter
      margin-left: 12.5px
    &__arrow
      position: absolute
      top: 50%
      right: 17.5px
      @extend %transition
      &--right
        transform: translateY(-50%)
      &--left
        transform: translateY(-50%) rotate(180deg) 
  &-content
    width: 518px
    max-width: 100%
  &-section
    height: 100%
    max-height: 100%
    padding: 30px 34px
    @include scrollbar
    @include isoScrolling
    & > div
      @include isoScrollingChild

// css 動畫設定
.slide
  &-right
    &-bar
      &-enter,
      &-leave-to
        opacity: 0
        transform: translateX(10vw)
    &-content
      &-enter,
      &-leave-to
        overflow: hidden
        width: 0px

    &-bar, &-content
      &-enter-active,
      &-leave-active
        @extend %transition
    &-content
      &-enter-active
        @extend %transition
      &-leave-active
        @extend %transition
        transition-delay: .3s

.fade
  &-in
    &-content
      &-enter,
      &-leave-to
        opacity: 0
      &-enter-active
        @extend %transition
        transition-delay: .3s
      &-leave-active
        @extend %transition

</style>

