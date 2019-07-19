<template lang="pug">
  .progress
    .progress-grup
      .progress-grup__item(
        v-for="(dot, index) in tomato.tomato",

        :class="{'progress-grup__item--large' : (size === 'large'), 'progress-grup__item--on': index === tomato.tomatoed}"
      )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Progress extends Vue {
  @Prop({ default: "small" }) private size!: 'small' | 'large';
  @Prop({ required: true })
  private tomato!: { tomato: number; tomatoed: number };
}

</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.progress
  &-grup
    &__item
      display: inline-block
      width: 8px
      height: 8px
      transition: .3s
      background-color: theme-color()
      border: 1px solid theme-color()
        radius: 50%
      &#{&}--large
        width: 12px
        height: 12px
        border-width: 2px
      &--on, &--on ~ &
        background-color: transparent
      & + &
        margin-left: 5px
</style>
