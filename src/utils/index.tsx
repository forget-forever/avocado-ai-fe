import { GetPhone } from "@/components";
import { request } from "./request";

export const bindTipNode = (success: () => void) => <GetPhone
  onSubmit={(res) => {
    if (res === 'ok') {
      success()
    }
  }}
>授权登陆</GetPhone>

export * from './config'

export * from './tool'

export * from './init'

export * from './utils'

export { request }