<template lang="pug">
  .music-group__item
    .music-group__cell.music-radio
      label.music-radio__label
        input.music-radio__input(type="radio", name="audio", :value="music.title", v-model="_selecting")
        .music-radio__dot
    .music-group__cell.music-title {{music.title}}
    .music-group__cell.music-ctrl(@click="musicPlayHandler")
      audio(ref="audio" preload="metadata" @ended="audioEndHandler")
        source(:src="music.URL" type="audio/mpeg")
      .music-ctrl__play(:class="isPlaying? 'music-ctrl__play--active' : ''")
</template>

<script lang="ts">
import { Watch, Component, Prop, Vue } from 'vue-property-decorator';
import { ToneConfig } from './../type/ToneConfig';

// components
import NavTitle from './NavTitle.vue';

@Component
export default class MusicItem extends Vue {
  // 宣告 DOM 型別
  public $refs!: {
    audio: HTMLMediaElement;
  };

  isPlaying: boolean | null = null;

  @Prop({ required: true }) private music!: ToneConfig;
  @Prop() private status!: string;

  get _selecting(): string {
    return this.$store.state[`_${this.status}`];
  }

  set _selecting(val) {
    this.$store.commit('CHANGE_TONE', {
      val,
      key: `_${this.status}`
    })
  }

  musicPlayHandler() {
    const audio: HTMLMediaElement = this.$refs.audio;
    audio.currentTime = 0;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
      return;
    }
    audio.pause();
    this.isPlaying = false;
  }

  audioEndHandler() {
    this.isPlaying = false;
  }

}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

%transition
  transition: .3s

.music
  &-group
    &__item
      @include flex
      background-color: #414141
      padding: 
        top: 15px
        right: 9px
        bottom: 15px
        left: 14px
      & + &
        margin-top: 1px
    &__cell
      & + &
        margin-left: 16px
  &-title
    flex-basis: 100%
    margin-top: 1.5px // 修正字體偏移
  &-radio
    +flexCenter
    &__input
      &[type="radio"]
        display: none
      &:checked + .music-radio__dot
        background-color: theme-color()
    &__dot
      width: 13px
      height: 13px
      border-radius: 50%
      border: 2px solid theme-color()
      cursor: pointer
      @extend %transition

  &-ctrl
    cursor: pointer
    &__play
      position: relative
      width: 20px
      height: 20px
      border-radius: 50%
      border: 2px solid #acacac
      @extend %transition
      &#{&}--active 
        border-color: theme-color()
        &:after
          border-left-color: theme-color()
      &:after
        content: ''
        +absCenter
        width: 0
        height: 0
        left: 2px
        border:
          top: 4px solid transparent
          right: 0px solid transparent
          bottom: 4px solid transparent
          left: 6px solid #acacac
        @extend %transition
</style>