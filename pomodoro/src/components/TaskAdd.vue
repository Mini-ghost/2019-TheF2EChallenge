<template lang="pug">
  .taskAdd
    NavTitle(:title="'ADD NEW TASK'")
    .taskAdd-content
      TaskForm
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

// components
import NavTitle from './NavTitle.vue'
import TaskForm from './TaskForm.vue'

@Component({
  components: {
    NavTitle,
    TaskForm
  }
})
export default class TaskAdd extends Vue {}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include
</style>