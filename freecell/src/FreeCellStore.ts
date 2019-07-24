import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import { CardsConfig } from './type/CardsConfig';

@Module({ name: 'FreeCellStore', namespaced: true })
export default class FreeCellStore extends VuexModule implements FreeCellStore {
  public cards: CardsConfig[] | undefined = undefined;
  public isDrag: boolean = false;
  public mousedowbPos: { x: number; y: number } = { x: 0, y: 0 };
  public targetPos: { x: number; y: number } = { x: 0, y: 0 };
	public target: HTMLDivElement | undefined = undefined;
	public lightBox: undefined | any = undefined

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
    if (!dom) return
		this.targetPos = dom
			? { x: dom.offsetLeft, y: dom.offsetTop }
			: { x: 0, y: 0 };
	}

	@Mutation
	SET_DOM_POS(data: { top: string, left: string }) {
		if(!this.target) return
		this.target.style.top = data.top
		this.target.style.left = data.left
		this.target.style.zIndex = '999'
	}

	@Mutation
	MOUSE_UP() {
		if(!this.target) return
		this.target.style.zIndex = null
	}
	
	@Mutation
	SET_LIGHTBOX(target: string | null) {
		switch (target) {
			case 'rule' :
				this.lightBox = {
					title: 'FREECELL RULE',
					message: `
						<p class="lightBox-message__p">
							The object of the game is to build up all cards on foundations from Ace to King by following suit. You win when all 52 cards are moved there, 13 to a pile. 
						</p>
						<p class="lightBox-message__p">
						Top cards of tableau piles and cards from Cells are available to play. You can build tableau piles down by alternating color. Only one card at a time can be moved. The top card of any tableau pile can also be moved to any Cell. Each Cell (or Reserve space) may contain only one card. Cards in the cells can be moved to the foundation piles or back to the tableau piles, if possible.
						</p>
						<p class="lightBox-message__p">
						The rules state that you can move only one card at a time, but you can move group of cards in the proper sequence if you have enough free (empty) Cells and/or tableau piles.
						</p>
					`
				}
				break
			case null :
				this.lightBox = undefined
				break
		}
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
