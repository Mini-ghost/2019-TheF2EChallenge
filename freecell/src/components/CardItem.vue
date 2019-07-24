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
  @Prop() private quantity!: number

  target: HTMLDivElement | EventTarget | undefined = undefined

  get _id(): number {
    return this.group + this.index * 8
  }

  get cardCanDrag(): boolean {
    if(this.index === (this.quantity - 1)) return true
    return false;
  }

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
    this.$store.commit('FreeCellStore/SET_TARGET', e.target);
  }

  mousemoveHandler(e: MouseEvent) {
    if (!this.isDrag || !this.cardCanDrag) return
    let target = <HTMLDivElement>this.$store.state.FreeCellStore.target;

    //- 改動 dom
    let top = `${this.targetPos.y + e.pageY - this.mousedowbPos.y}px`;
    let left = `${this.targetPos.x + e.pageX - this.mousedowbPos.x}px`;
    this.$store.commit('FreeCellStore/SET_DOM_POS', { top, left })
  }

  mouseupHandler(e: MouseEvent) {
    let target = <HTMLDivElement>this.$store.state.FreeCellStore.target;
    this.$store.commit('FreeCellStore/MOUSE_UP');
    this.$store.commit('FreeCellStore/SET_TARGET', undefined);
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
    padding-bottom: 152.6316%
    background-color: #fcfcfc
    overflow: hidden
    background-size: cover
    background-repeat: no-repeat
    border: 1px solid rgba(#bababa, .5)
      radius: 5px

</style>
