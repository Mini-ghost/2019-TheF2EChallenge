<template lang="pug">
  .tasklist
    NavTitle(:title="'TASK LISTS'")
    .tasklist-content
      .tab
        //- tab 標籤
        ul.tab-list.fz-12.fw-bold
          li.tab-list__item(
              v-for="tab in tabList"
              :class="(tab === inTab)? 'tab-list__item--active' : ''"
              @click="tabSelectHandler(tab)"
            ) {{tab.toUpperCase()}}
        //- tab 內容
        transition-group(tag="ul", class="tab-content", name="fade-in-item", appear)
          TabItem(
              v-for="(task, id) in showList", 
              :task="task"
              :style="'transition-delay: ' + id * 0.15 + 's;'", 
              :key="task.id"
            )
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import { TaskConfig } from './../type/TaskConfig'

// components
import NavTitle from './NavTitle.vue'
import TabItem from './TabItem.vue'

@Component({
  components: {
    NavTitle,
    TabItem,
  }
})
export default class TaskList extends Vue {

  tabList: string[] = this.$store.state.taskTab
  inTab: string = this.tabList[0]

  get taskList(): TaskConfig[] {
    return this.$store.state.taskList
  }

  get showList(): TaskConfig[] {
    let filter: boolean, list: TaskConfig[]
    switch(this.inTab){
      case 'todo' : filter = false; break;
      case 'done' : filter = true; break;
    }
    list = this.taskList.filter((obj: TaskConfig) => (obj.isDone === filter))
    return list
  }

  async mounted() {
    await this.$store.dispatch('GET_TASK')
  }

  tabSelectHandler(tab: string) {
    this.inTab = tab
  }

  openSectionHandler(id: number) {
    if(this.showList[id].isEdite) this.showList[id].isEdite = false
    else this.showList[id].isEdite = true
  }

}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

%transition
  transition: .3s

.tasklist
  &-content
    padding: 30px 0
// 頁籤設定
.tab
  &-list
    &__item
      display: inline-block
      width: 80px
      border-radius: 5px 5px 0 0
      background-color: #606060
      text-align: center
      padding: 5px 0
      cursor: pointer
      user-select: none
      @extend %transition
      & + &
        margin-left: 5px
      &:hover
        background-color: lighten(theme-color(), 10%)
      &#{&}--active
        background-color: theme-color()

// 動畫設定
.fade
  &-in
    &-item
      &-enter
        overflow: hidden
        transform: translateX(10vw)
        opacity: 0
      &-leave-to
        overflow: hidden
        opacity: 0
        transform: translateX(-10vw)
      &-enter-active, 
      &-leave-active
        @extend %transition
</style>
