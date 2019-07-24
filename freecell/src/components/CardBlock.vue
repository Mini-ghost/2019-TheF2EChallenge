<template lang="pug">
  .card
    .card-group(:class="regionClass")
      .card-group__item(v-for="(item, id) in quantity" @mouseenter="mouseenterHandler(region + id)")
        .card-content
          CardItem(
            v-for="(card, _id) in cardsArray[id]",
            :group="id",
            :index="_id",
            :card="card"
            :key="card.code + card.num"
            :quantity="cardsArray[id].length"
            )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { CardsConfig } from '@/type/CardsConfig';

import CardItem from './CardItem.vue';

@Component({
  components: {
    CardItem
  }
})
export default class CardBlock extends Vue {
  @Prop() private quantity!: number;
  @Prop() private region!: string;
  @Prop() private cardData!: CardsConfig[];

  get regionClass(): string {
    return `card-group--${this.region}`;
  }

  get cardsArray() {
    let array: CardsConfig[][] = [];

    for (let i = 0, l = this.quantity; i < l; i++) array.push([]);

    if (!this.cardData) return;
    this.cardData.forEach((obj: CardsConfig, id: number) => {
      array[id % 8].push(obj);
    });
    return array;
  }

  mouseenterHandler(data: string) {
    // console.log(data)
  }
}
</script>

<style lang="sass">
@import ./../assets/sass/variable/include

.card
  &-group
    width: 100%
    @include flex(space-between)
    &--playregion
      height: 100%
    &__item
      width: 9.7vw
      max-width: 120px
      border:
        width: 1px
        style: solid
        radius: 5px
      .card-group--cache &
        border-color: #fcfcfc
      .card-group--complete &
        border-color: #fcfcfc
        background-color: #fcfcfc
      .card-group--playregion &
        border-color: transparent
        height: 100%
  &-content
    width: 100%
    max-width: 120px
    position: relative
    padding-bottom: 152.6316%
</style>
