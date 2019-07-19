<template lang="pug">
  .ringtone(v-if="isMounted")
    NavTitle(:title="'RING TONE'")
    .ringtone-content
      .tab
        //- tab 標籤
        ul.tab-list.fz-12.fw-bold
          li.tab-list__item(
              v-for="(tab, id) in tabList"
              :class="(id === inTab)? 'tab-list__item--active' : ''"
              @click="tabSelectHandler(id)"
            ) {{tab.toUpperCase()}}
        //- tab 內容
        transition-group(tag="ul", class="music-group", name="fade-in-item", appear)
          MusicItem(v-for="(music, id) in showList", 
            :style="'transition-delay: ' + id * 0.15 + 's;'", 
            :music="music",
            :status="inTabName"
            :key="music.title") 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ToneConfig } from './../type/ToneConfig';
import { ToneListConfig, ToneObjConfig } from './../type/ToneListConfig';

// components
import NavTitle from './NavTitle.vue';
import MusicItem from './MusicItem.vue';

@Component({
  components: {
    NavTitle,
    MusicItem
  }
})
export default class Ringtone extends Vue {

  // 預設選取第一個 tab
  inTab: number = 0;
  isMounted: boolean = false

  get toneObj() {
    return this.$store.state.toneObj;
  }

  get tabList() {
    return this.$store.state.toneTab;
  }

  get inTabName(): string {
    return this.tabList[this.inTab];
  }

  get showList() {
    let str: string = this.inTabName;
    let list: ToneConfig[] = this.toneObj[str].map((music: ToneConfig, id: number) => ({
      id,
      ...music
    }));
    return list;
  }

  async mounted() {
    await this.$store.dispatch('GET_TONE');
    this.isMounted = true
  }

  tabSelectHandler(id: number) {
    this.inTab = id;
  }

}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.ringtone
  &-content
    padding: 30px 0
</style>