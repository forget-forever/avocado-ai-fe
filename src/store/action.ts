import { setLocalStorage } from "@/utils/utils"
import dayjs from "dayjs";
import { setState } from "."

export const actions = {
  setOpenId: async (openId: string) => {
    setLocalStorage('openId', openId);
    setState('common', {openId})
    return openId;
  },
  setToken: async ( msg: {openId: string, token: string, userInfo: GlobalState['common']['userInfo']} ) => {
    const { openId, token, userInfo } = msg;
    const tokenData = { val: token, time: +dayjs().unix()}
    setLocalStorage('info', {openId, token: tokenData, userInfo})
    setState('common', { openId, token: tokenData, userInfo })
  },
  modalOption: async (msg: GlobalState['global']['modalMsg']) => {
    setTimeout(() => {
      setState('global', {modalMsg: msg})
    }, 0)
  }
}
