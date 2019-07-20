<template lang="pug">
  form.form(:class="formTypeClass" @submit.prevent)
    .form-item
      .form-item__title TASK TITLE
      .form-item__warp
        label.form-item__label
          input.form-item__input(
            type="text",
            placeholder="My Second Task",
            v-model.trim="taskTitle"
          )
    .form-item
      .form-item__title ESTIMATED TOMOTO
      .form-item__warp
        label.form-item__label(v-for="id in tomato" :class="(inChecked === id)? 'form-item__label--active' : ''")
          input.form-item__input(type="radio" name="tomato" :value="id" v-model="inChecked")
          img.form-item__img(src="./../assets/images/tomato_small_color.svg")
    .form-item__item
      .form-item__warp(v-if="status === 'set'")
        button.form-item__button.form-item__button--small.fz-14(type="button") ARCHIVE
        button.form-item__button.form-item__button--large.fz-14(type="button", @click="saveChangeHandler") SAVE
      .form-item__warp(v-else)
        button.form-item__button.form-item__button--large.fz-14(type="button", @click="addTaskHandler") ADD TASK

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { TaskConfig } from './../type/TaskConfig';

@Component
export default class TaskForm extends Vue {
  // prop
  @Prop({ default: 'new' }) private status!: 'new' | 'set'
  @Prop({ default: () => ({
      id: null,
      title: '',
      tomato: 4,
      tomatoed: 0,
      isDone: false
    })
  }) private task!: TaskConfig

  // data
  inChecked: number = this.task.tomato
  taskTitle: string = this.task.title

  // computed

  get id(): number | undefined {
    return this.task.id || this.$store.state.taskList.length
  }

  get tomato() {
    return this.$store.state.tomato
  }

  get formTypeClass() {
    if(this.status === 'new') return
    return `form--${this.status}`
  }

  saveChangeHandler() {
    if(!this.taskTitle) return
    const taskChange: {id: number | undefined ,inChecked: number, taskTitle: string} = {
      id: this.id,
      inChecked: this.inChecked,
      taskTitle: this.taskTitle
    }
    this.$store.commit('SAVE_TASK', taskChange)
  }

  addTaskHandler() {
    if(!this.taskTitle) return
    const taskChange: {id: number | undefined ,inChecked: number, taskTitle: string} = {
      id: this.id,
      inChecked: this.inChecked,
      taskTitle: this.taskTitle
    }
    if(this.status === 'new') {
      this.inChecked = 4
      this.taskTitle = ''
    }
    this.$store.commit('SAVE_TASK', taskChange)
  }
} 
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.form
  &-item
    margin: 30px 0
    .form--set &
      margin: 12px 0
    &:last-child
      margin-top: 50px
    &__title
      font-weight: bold
      color: #acacac
      margin: 10px 0
      .form--set &
        font-size: rem(14px)
    &__warp
      +flex(space-between)
    &__label
      &:only-child
        width: 100%
    &__label--active ~ &__label > &__img
      filter: grayscale(100%)
    &__input
      &[type="text"]
        width: 100%
        border-radius: 5px
        background-color: $white
        color: theme-color(font)
        padding: 16px
        .form--set &
          padding: 12px
        &::placeholder
          color: inherit
      &[type="radio"]
        display: none
        & + img
          max-width: 25px 
          transition: .3s
          cursor: pointer
          .form--set &
            max-width: 20px 
    &__button
      font-weight: bold
      width: 100%
      text-align: center
      background-color: theme-color()
      color: $white
      padding: 18px 0
      border-radius: 30px
      & + &
        margin-left: 1vw
      &--small
        flex-basis: 33.33%
        flex-shrink: 1
        background-color: #606060
      &--large
        flex-basis: 66.66%
        flex-shrink: 1
        flex-grow: 1
      .form--set &
        padding: 12px 0

</style>