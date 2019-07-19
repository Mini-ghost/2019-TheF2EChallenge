import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({ name: 'MainStore', namespaced: true })
export default class MainStore extends VuexModule implements MainStore {
  public autioDOM: HTMLAudioElement | undefined = undefined
  public audioType: string = ''
  public working: boolean = true

  @Mutation
  SET_AUDIO(dom: HTMLAudioElement) {
    this.autioDOM = dom
  }

  @Mutation
  CHANGE_AUDIO_TYPE(res: string) {
    this.audioType = res
  }

  @Mutation
  CHANGE_WORK_TYPE(type: boolean) {
    this.working = type
  }
}

