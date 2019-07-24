import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { CardsConfig } from './type/CardsConfig';

@Module({ name: 'FreeCellStore', namespaced: false })
export default class FreeCellStore extends VuexModule implements FreeCellStore {
  public cards: CardsConfig[] | undefined = undefined;
  public isDrag: boolean = false;
  public mousedowbPos: { x: number; y: number } = { x: 0, y: 0 };
  public targetPos: { x: number; y: number } = { x: 0, y: 0 };
  public target: HTMLDivElement | undefined = undefined;

  @Mutation
  SET_CARDS(data: CardsConfig[]) {
    // localStorage.setItem('FREECELL', JSON.stringify(data))
    this.cards = data;
  }

  @Mutation
  SET_MOUST_TYPE(val: boolean) {
    this.isDrag = val;
  }

  @Mutation
  SET_MOUST_POS(val: { x: number; y: number }) {
    this.mousedowbPos = val;
  }

  @Mutation
  SET_TARGET(dom: HTMLDivElement | undefined) {
    this.target = dom;
    if (dom)
      this.targetPos = dom
        ? { x: dom.offsetLeft, y: dom.offsetTop }
        : { x: 0, y: 0 };
  }

  @Action
  GET_CARDS() {
    //LocalStorage
    // let storage: string | null = localStorage.getItem('FREECELL')
    // let cards: any[] = storage? JSON.parse(storage) : []
    let cards: CardsConfig[] = [];
    const quantity: number = 13;
    const suits: { name: string; code: string; color: string }[] = [
      { name: 'spades', code: 'S', color: 'black' },
      { name: 'hearts', code: 'H', color: 'red' },
      { name: 'diamonds', code: 'D', color: 'red' },
      { name: 'clubs', code: 'C', color: 'black' }
    ];
    // if (storage) return this.SET_CARDS(cards)

    for (let i = 0, end = suits.length; i < end; i++) {
      let data = suits[i];
      for (let num = 1, k = quantity + 1; num < k; num++) {
        const type: 'provisiona' | 'complete' | 'playregion' = 'playregion';
        cards.push({ num, ...data, type });
      }
    }
    cards.sort(() => (Math.random() > 0.5 ? 1 : -1));
    this.SET_CARDS(cards);
  }
}
