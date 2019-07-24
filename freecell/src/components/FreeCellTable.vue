<template lang="pug">
  main.playTable(
    v-if="isMounted",
    @mousedown="mousedownHandler",
    @mouseup="mouseupHandler"
  )
    .playTable-container.container
      //- 上排
      .playTable-wrap.playTable-wrap--head
        CardBlock.playTable-table(
          :quantity="4", 
          :region="'cache'", 
          :card-data="cacheCards"
        )
        .playTable-logo
          img.playTable-logo__image(src="./../assets/image/king_happy.png", alt="FreeCell 新接龍")
          h1.playTable-logo__title.fz-14.fw-bold FREECELL
        CardBlock.playTable-table(
          :quantity="4", 
          :region="'complete'", 
          :card-data="completeCards"
        )
      //- 下排
      .playTable-wrap.playTable-wrap--body
        CardBlock.playTable-table(
          :quantity="8",
          :region="'playregion'",
          :card-data="playregionCards"
        )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardsConfig } from '@/type/CardsConfig';

// components
import CardBlock from './CardBlock.vue';

// vuex
import FreeCellStore from '@/FreeCellStore';
import { getModule } from 'vuex-module-decorators';

@Component({
  components: {
    CardBlock
  }
})
export default class FreeCellTable extends Vue {
  storeModule = getModule(FreeCellStore, this.$store);
  isMounted: boolean = false;

  get mousedowbPos(): { x: number; y: number } {
    return this.$store.state.FreeCellStore.mousedowbPos;
  }
  set mousedowbPos(val: { x: number; y: number }) {
    this.storeModule.SET_MOUST_POS(val);
  }

  get isDrag(): boolean {
    return this.$store.state.FreeCellStore.isDrag;
  }
  set isDrag(val: boolean) {
    this.storeModule.SET_MOUST_TYPE(val);
  }

  get cards(): [] {
    return this.$store.state.FreeCellStore.cards;
  }

  get cacheCards(): CardsConfig[] {
    return this.filterCardHandler('cache');
  }

  get completeCards(): CardsConfig[] {
    return this.filterCardHandler('complete');
  }

  get playregionCards(): CardsConfig[] {
    return this.filterCardHandler('playregion');
  }

  mounted() {
    this.storeModule.GET_CARDS();
    this.isMounted = true;
  }

  filterCardHandler(type: string) {
    return this.cards.filter((obj: CardsConfig) => obj.type === type);
  }

  mousedownHandler(e: MouseEvent) {
    let x: number = e.pageX,
      y: number = e.pageY;
    this.isDrag = true;
    this.mousedowbPos = { x, y };
  }

  mouseupHandler(e: MouseEvent) {
    this.isDrag = false;
    this.mousedowbPos = { x: 0, y: 0 };
  }
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.playTable
  height: calc(100% - 80px)
  width: 100%
  &-container
    padding: 2.604167vw 0.78125vw
    height: 100%
  &-wrap
    @include flex(space-between)
    & + &
      margin-top: 30px
    &--body
      height: 100%
  &-table
    width: 100%
  &-logo
    width: 100%
    max-width: 120px
    position: relative
    @include flexCenter
    flex-direction: column
    padding: 0 23px
    &__image
      display: block
      width: 73.333%
      margin: 0 auto
    &__title
      text-align: center
      margin: 5px 0

</style>
