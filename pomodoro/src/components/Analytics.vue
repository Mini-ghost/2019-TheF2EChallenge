<template lang="pug">
  .analytics
    NavTitle(:title="'ANALYTICS REPORT'")

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// components
import NavTitle from './NavTitle.vue'
@Component({
  components: {
    NavTitle
  }
})
export default class Analytics extends Vue {}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include
</style>

