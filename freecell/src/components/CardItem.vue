<template lang="pug">
  .card-item(
    :style="cardStyle", 
    @mousemove="mousemoveHandler"
    @mousedown="mousedownHandler"
    @mouseup="mouseupHandler"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardsConfig } from '@/type/CardsConfig';

import CardItem from './CardItem.vue';

@Component
export default class CardBlock extends Vue {
  @Prop() private group!: number;
  @Prop() private index!: number;
  @Prop() private card!: CardsConfig;

  get isDrag(): boolean {
    return this.$store.state.FreeCellStore.isDrag;
  }

  get targetPos(): { x: number; y: number } {
    return this.$store.state.FreeCellStore.targetPos;
  }

  get mousedowbPos(): { x: number; y: number } {
    return this.$store.state.FreeCellStore.mousedowbPos;
  }

  get cardStyle() {
    let BGI = require(`./../assets/image/cards/${this.card.code +
      this.card.num}.png`);
    return `top: ${30 * this.index}px; background-image: url(${BGI});`;
  }

  mousedownHandler(e: MouseEvent) {
    this.$store.commit('SET_TARGET', e.target);
  }

  mousemoveHandler(e: MouseEvent) {
    if (!this.isDrag) return;
    let target = <HTMLDivElement>e.currentTarget;
    this.$nextTick(() => {
      target.style.top = `${this.targetPos.y +
        e.pageY -
        this.mousedowbPos.y}px`;
      target.style.left = `${this.targetPos.x +
        e.pageX -
        this.mousedowbPos.x}px`;
      target.style.zIndex = '999';
    });
  }

  mouseupHandler(e: MouseEvent) {
    let target = <HTMLDivElement>e.currentTarget;
    this.$nextTick(() => {
      target.style.top = `${this.targetPos.y +
        e.pageY -
        this.mousedowbPos.y}px`;
      target.style.left = `${this.targetPos.x +
        e.pageX -
        this.mousedowbPos.x}px`;
      target.style.zIndex = null;
    });
  }
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.card
  &-item
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: #fcfcfc
    overflow: hidden
    background-size: cover
    background-repeat: no-repeat
    border: 0.5px solid rgba(#bababa, .5)
      radius: 5px

</style>
