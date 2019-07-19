<template lang="pug">
  li.tab-body__item
    .tab-header
      .tab-header__going
        label.tab-header__label(v-show="!task.isDone")
          input.tab-header__input(type="radio", name="doing", :value="task.id" v-model="going")
          img(src="./../assets/images/tomato_small_color.svg", title="進行中" )
      .tab-header__content
        .tab-header__title {{task.title}}
        //- 請當新模組
        Progress(:tomato="{tomato: task.tomato, tomatoed: task.tomatoed}")
      .tab-header__edit(@click="openSectionHandler")
        span.tab-header__dot
        span.tab-header__dot
        span.tab-header__dot
    .tab-section(v-show="isOpen")
      hr.tab-section__hr
      TaskForm(
        :task="task"
        :status="'set'",
        )
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { TaskConfig } from './../type/TaskConfig';

// components
import Progress from './Progress.vue';
import TaskForm from './TaskForm.vue';


@Component({
  components: {
    Progress,
    TaskForm
  }
})
export default class TabItem extends Vue {

  @Prop() private task!: TaskConfig

  isOpen: boolean = false

  get going(): number {
    return this.$store.state.taskDoingId
  }
  set going(val: number) {
    this.$store.commit('SET_GOING', val)
  }

  openSectionHandler() {
    this.isOpen = !this.isOpen
  }
}
</script>


<style lang="sass">
@import ./../assets/sass/variable/include

%transition
  transition: .3s

.tab
  &-body
    &__item
      background-color: #414141
      border-radius: 2px
      & + &
        margin-top: 1px
  &-header
    @include flex
    &__going
      @include flexCenter
      position: relative
      min-width: 40px
      padding: 10px
    &__label
      cursor: pointer
    &__input
      &[type="radio"]
        display: none
      & + img
        width: 13px
        filter: grayscale(100%)
        opacity: 0.5
        pointer-events: none
        @extend %transition
      &:checked + img
        filter: grayscale(0)
        opacity: 1
        pointer-events: auto
    &__content
      width: 100%
      padding: 9px 0
    &__edit
      @include flexCenter
      min-width: 40px
      cursor: pointer
    &__dot
      display: inline-block
      width: 4px
      height: 4px
      border-radius: 50%
      background-color: #acacac
      margin-left: -1px
      & + &
        margin-left: 2px
  &-section
    padding:
      top: 0px
      right: 40px
      bottom: 16px
      left: 40px
    &__hr
      border-top: 1px solid #333
</style>