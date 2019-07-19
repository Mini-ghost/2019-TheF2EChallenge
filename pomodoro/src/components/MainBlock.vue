<template lang="pug">
  main.main
    .main-container.container
      transition(name='fade-in-main', mode="out-in", v-if="task", appear)
        .main-content()
          .main-task.fz-24.fw-bold {{task.title}}
          Progress.mt-small(
            :size="'large'", 
            :tomato="{tomato: task.tomato, tomatoed: task.tomatoed}")
          PieChart(:id="this.task.id")
          .ctrl
            .ctrl-group
              i.icon-play.ctrl-group__item(@click="ctrlHandler('play')", :class="{'ctrl-group__item--active': audioType === 'play'}")
              i.icon-pause.ctrl-group__item(@click="ctrlHandler('pause')", :class="{'ctrl-group__item--active': audioType === 'pause'}")
              i.icon-reset.ctrl-group__item(@click="ctrlHandler('reset')", :class="{'ctrl-group__item--active': audioType === 'reset'}")
          .complete.fz-14.fw-bold
            label.complete__label
              input.complete__input(type="checkbox")
              .complete-item(@click="completeTaskHandler")
                span.complete-item__check
                span.complete-item__text TASK COMPLETE
          audio(ref="audio",
                preload="metadata",
                v-if="music",
                :key="music.title"
                loop
              )
            source(:src="music.URL" type="audio/mpeg")
      //- 區分一下
      transition(name='fade-in-main', mode="out-in", v-else, appear)
        .main-content()
          .main-title
            h1.main-title__text.main-title__text--white.fz-24.fw-lighter POMODORO
            img.main-title__image(src="./../assets/images/tomato_small_color.svg", alt="POMODORO")
          p.main-description.fz-14 You don’t have any task now, 
            br
            | please add task first!
      p.title.fz-12.fw-lighter POMODORO


</template>

<script lang="ts">
import { Watch, Component, Prop, Vue } from 'vue-property-decorator';
import { TaskConfig } from '@/type/TaskConfig';
import { ToneConfig } from '@/type/ToneConfig';

//vuex
import MainStore from '@/MainStore'

// components
import PieChart from './PieChart.vue'
import Progress from './Progress.vue';

@Component({
  components: {
    PieChart,
    Progress
  }
})
export default class MainBlock extends Vue {
  // audio DOM
  public $refs!: {
    audio: HTMLMediaElement;
  };

  get audioType() {
    return this.$store.state.MainStore.audioType
  }

  get working(): boolean {
    return this.$store.state.MainStore.working
  }

  get task(): TaskConfig {
    let list: TaskConfig = this.$store.state.taskList.find((item: TaskConfig) => (
      item.isDone === false 
    )) 
    return list
  } // 工作中物件

  get music() {
    let key1 = this.working? '_work' : '_break'
    let key2 = this.working? 'work' : 'break'
    let name: string = this.$store.state[`${key1}`] || '';
    let list: ToneConfig[] = this.$store.state.toneObj[`${key2}`] || [];
    this.audioType === 'play' && this.$nextTick(() => { this.$refs.audio.play(); });
    this.$store.commit('MainStore/SET_AUDIO', this.$refs.audio)
    return list.find((tone: ToneConfig) => tone.title === name) || {
      title: '',
      URL: '',
      select: true
    };
  } // 音樂資料

  mounted() {
    this.$store.registerModule('MainStore', MainStore); // 註冊模組
  }

  completeTaskHandler(event: MouseEvent) {
    this.$store.commit('FINISH_TASK_ALL', this.task.id)
    const dom: HTMLLabelElement | any = event.currentTarget
    setTimeout(()=>{
      dom.previousElementSibling.checked = false
    }, 1000)
  } // 完成一組 TASK

  ctrlHandler(type: string) {
    this.$store.commit('MainStore/CHANGE_AUDIO_TYPE', type)
  } // 音樂撥放控制器
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

%transition
  transition: .3s

%width_100
  width: 100%

%por
  position: relative

%usn
  user-select: none

.main
  @extend %width_100
  &-container
    @include flexCenter
    @extend %width_100
    height: 100vh
    flex-direction: column
  &-content
    text-align: center
    @extend %width_100
  &-title
    @extend %por
    max-width: 300px
    height: 300px
    margin: 0 auto
    @extend %usn
    letter-spacing: 1px
    @include flexCenter
    &__image
      position: absolute
      @extend %width_100
      max-width: 300px
      z-index: -1
    &__text
      &--white
        color: $white
  &-description
    margin-top: 2.5vw
    letter-spacing: 1px
    line-height: 1.8

.title
  margin-top: 5vw
  @extend %usn

// 圖表部分
.pieChart
  width: 90%
  max-width: 300px
  margin:
    top: 5vw
    right: auto
    left: auto
  @extend %por
  font-size: 0
  &-svg
    @extend %width_100
    &__underlay, &__overlay
      fill: transparent
    &__underlay
      stroke: #acacac
    &__overlay
      &--work
        stroke: theme-color()
      &--break
        stroke: type-color()
  &-timmer
    @include absCenter
    @include flexCenter
    @extend %usn
    background-color: $white
    border-radius: 50%
    z-index: -1
    
.ctrl
  width: 90%
  max-width: 300px
  margin:
    top: 5vw
    right: auto
    left: auto
  &-group
    display: flex
    justify-content: space-between
    &__item
      display: inline-flex
      justify-content: center
      align-items: center
      @extend %por
      width: 50px
      height: 50px
      border-radius: 50%
      background-color: #fcfcfc
      color: #acacac
      cursor: pointer
      @extend %usn
      @extend %transition
      &:hover
        color: rgba(theme-color(), .8)
      &#{&}--active
          color: theme-color()

.complete
  margin-top: 5vw
  &__label
    cursor: pointer
  &__input
    &[type="checkbox"]
      display: none
  &-item
    display: inline-block
    @extend %por
    .complete__input:checked + & &__check
      &:after
        width: 8px
        height: 5px
        transform: rotate(-45deg)
        border:
          bottom: 2px solid theme-color()
          left: 2px solid theme-color()
        opacity: 1
    &__check, &__text
      display: inline-block
      user-select: none
    &__check
      @extend %por
      top: 2px
      width: 16px
      height: 16px
      border-radius: 50%
      border: 2px solid theme-color()
      margin-right: 5px
      &:after
        content: ""
        position: absolute
        top: 3px
        left: 2px
        opacity: 0
        transform: rotate(45deg)
        @extend %transition

.fade
  &-in
    &-main
      &-enter,
      &-leave-to
        opacity: 0
      &-enter-active,
      &-leave-active
        @extend %transition
</style>
