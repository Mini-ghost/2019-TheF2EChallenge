<template lang="pug">
  .nav-title
    h2.nav-title__text.fz-20.fw-bold {{title}}
    hr.nav-title__hr
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NavTitle extends Vue {
  @Prop({ default: '未輸入標題' }) private title!: string;
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include
.nav
  &-title
    &__text
      margin: 
        top: 0
        left: 0
        bottom: 30px
        right: 0
    &__hr
      border-top: 1px solid #434343
</style>