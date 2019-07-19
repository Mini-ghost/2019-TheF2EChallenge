import { ToneConfig } from './ToneConfig'

export type ToneListConfig = ToneConfig[]

export type ToneObjConfig = {
  work: ToneListConfig,
  break: ToneListConfig
}