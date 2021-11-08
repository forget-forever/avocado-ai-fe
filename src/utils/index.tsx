import { GetPhone } from "@/components";

export const bindTipNode = (success: () => void) => <>
  尚未绑定个人信息，没有绑定个人信息的时，无法将自己的信息放入盲盒。
  <GetPhone
    onSubmit={(res) => {
      if (res === 'ok') {
        success()
      }
    }}
  >授权登陆</GetPhone>
</>