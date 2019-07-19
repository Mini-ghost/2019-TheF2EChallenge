<template lang="pug">
  .pieChart
    svg.pieChart-svg(xmlns="http://www.w3.org/2000/svg", viewBox="0 0 100 100")
      circle.pieChart-svg__underlay(
        cx="50", 
        cy="50",
        :r="chart.radius", 
        :stroke-width="chart.width", 
        :stroke-dasharray="chart.dasharray", 
        stroke-dashoffset="0",
      )
      circle.pieChart-svg__overlay(
        cx="50", 
        cy="50",
        :r="chart.radius", 
        :stroke-width="chart.width", 
        :stroke-dasharray="chart.dasharray", 
        :stroke-dashoffset="dashoffset",
        :class="chartClassType",
      )
    .pieChart-timmer.fz-40.fw-bold {{countdown}}
</template>

<script lang="ts">
import { Watch, Component, Prop, Vue } from 'vue-property-decorator';
import { TaskConfig } from './../type/TaskConfig';
@Component
export default class PicChart extends Vue {

  @Prop() id!: number

  chart: { radius: number; width: number; dasharray: number } = {
    radius: 40,
    width: 20,
    dasharray: 40 * 2 * Math.PI
  };
  workSec: number = 1500;
  breakSec: number = 300;
  countdownSec: number = this.workSec;
  dashoffset: number = this.chart.dasharray;
  timmer: number | undefined = undefined;
  timmerSec: number | undefined = undefined;

  get audioDOM() {
    return this.$store.state.MainStore.autioDOM
  }

  get audioType() {
    return this.$store.state.MainStore.audioType
  }
  set audioType(val: string) {
    this.$store.commit('MainStore/CHANGE_AUDIO_TYPE', val)
  }

  get working() {
    return this.$store.state.MainStore.working
  }
  set working(val: boolean) {
    this.$store.commit('MainStore/CHANGE_WORK_TYPE', val)
  }

  get step(): number {
    const dasharray: number = this.chart.dasharray
    const workSec: number = (this.working)? this.workSec : this.breakSec
    const _step: number = dasharray / (workSec * (1000/16.66666666666667))
    return  _step * (1 + 1 / workSec)
  } // 一單位的計步器距離

  get countdown(): string {
    const time: number = this.countdownSec;
    let min: string | number = ~~(time / 60);
    let sec: string | number = time % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    return `${min} : ${sec}`;
  } // 秒數轉時間

  get chartClassType(): string {
    const preClass: string = 'pieChart-svg__overlay'
    return `${ preClass }--${ this.working? 'work' : 'break' }` ;
  } // SVG 顏色 class

  textCountdownHandler(down?: boolean) {
    if (this.countdownSec === 0) {
      this.restTimmerHandler();
      if(this.working) {
        this.breakCountdownHandler()
        return
      }
      this.working = true
      this.$store.commit('FINISH_TASK', this.id)
      return;
    }
    down && (this.countdownSec -= 1);
    this.timmerSec = setTimeout(() => {
      this.textCountdownHandler(true);
    }, 1000);
  } // 時間文字計時器

  dashoffsetPlussHandler() {
    if (this.dashoffset >= (this.chart.dasharray * 2)) {
      this.restTimmerHandler();
      if(this.working) {
        this.breakCountdownHandler()
        return
      }
      this.working = true
      this.$store.commit('FINISH_TASK', this.id)
      return;
    }
    this.dashoffset += this.step;
    this.timmer = setTimeout(() => {
      this.dashoffsetPlussHandler();
    }, 16.66666666666667);
  } // 進度條計時器

  breakCountdownHandler() {
    this.working = false
    this.audioType = 'play'
    this.dashoffsetPlussHandler()
    this.textCountdownHandler()
  }

  restTimmerHandler() {
    // 狀態更改
    this.$store.commit('MainStore/CHANGE_AUDIO_TYPE', '')
    // 圖表計時器
    clearTimeout(this.timmer);
    this.timmer = undefined;
    this.dashoffset = this.chart.dasharray;
    // 數字計時器
    clearTimeout(this.timmerSec);
    this.timmerSec = undefined;
    this.countdownSec = this.workSec;
    // 音樂歸零
    this.audioDOM.pause();
    this.audioDOM.currentTime = 0;
  } // 清除計時器集合

  @Watch('working')
  workingChangeHandler(val: string) {
    this.countdownSec = (this.working)? this.workSec : this.breakSec
  }

  @Watch('audioType')
  countdownHandler(val: string) {
    switch (val) {
      case 'play':
        if (this.timmer) return;
        this.textCountdownHandler();
        this.dashoffsetPlussHandler();
        this.audioDOM.play();
        this.audioType = 'play'
        break;
      case 'pause':
        if (!this.timmer && !this.audioType) return;
        clearTimeout(this.timmer);
        clearTimeout(this.timmerSec);
        this.timmer = undefined;
        this.timmerSec = undefined;
        this.audioDOM.pause();
        this.audioType = 'pause'
        break;
      case 'reset':
        if (!this.audioType) return;
        this.restTimmerHandler();
        this.audioType = ''
        break;
    }
  }
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include
.pieChart
  position: relative
  width: 90%
  max-width: 300px
  margin:
    right: auto
    left: auto
  font-size: 0
  &-svg
    width: 100%
    transform: rotate(-90deg)
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
    user-select: none
    background-color: $white
    border-radius: 50%
    z-index: -1
</style>