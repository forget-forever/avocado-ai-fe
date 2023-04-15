import { delay, setLocalStorage } from "@/utils"
import dayjs from "dayjs";
import { getUserInfo } from '@/serves'
import { setState } from "."

export const actions = {
  setToken: ( msg: {openId: string, token: string}) => {
    const { openId, token } = msg;
    const tokenData = { val: token, time: +dayjs().unix() };
    setLocalStorage('info', {openId, token: tokenData});
    // await delay(100)
  },
  /**
   * 自定义的全局的modal提示框
   * @param msg modal的参数设置为 undefined 的时候 modal 消失
   */
  modalOption: async (msg: GlobalState['global']['modalMsg']) => {
    await delay(5)
    setState('global', {modalMsg: msg})
  },
  /**
   * 获取用户信息
   */
  getUserInfo: async () => {
    const res = await getUserInfo()
    setState('common', { userInfo: res });
    setLocalStorage('userInfo', res)
  }
}
