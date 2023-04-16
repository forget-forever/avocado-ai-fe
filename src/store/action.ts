import { delay, setLocalStorage } from "@/utils"
import dayjs from "dayjs";
import { getAvocadaInfoVM, getUserInfo } from '@/serves'
import { setState } from "."

let ModalInstance: undefined | ((msg?: GlobalState['global']['modalMsg']) => void )

export const actions = {
  setToken: ( msg: {openId: string, token: string}) => {
    const { openId, token } = msg;
    const tokenData = { val: token, time: +dayjs().unix() };
    setLocalStorage('info', {openId, token: tokenData});
    // await delay(100)
  },
  setOpenModalFunc: (cb: typeof ModalInstance) => {
    ModalInstance = cb
  },
  /**
   * 自定义的全局的modal提示框
   * @param msg modal的参数设置为 undefined 的时候 modal 消失
   */
  modalOption: async (msg: GlobalState['global']['modalMsg']) => {
    await delay(5)
    ModalInstance?.(msg)
  },
  /**
   * 获取用户信息
   */
  getUserInfo: async () => {
    const [res, avoRes] = await Promise.all([getUserInfo(), getAvocadaInfoVM() ])
    setState('common', { userInfo: res, avoSettings: avoRes });
    setLocalStorage('userInfo', res)
    return res
  }
}
