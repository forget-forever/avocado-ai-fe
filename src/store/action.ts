import { setLocalStorage } from "@/utils/utils"
import moment from "moment";
import { setState } from "."

export const actions = {
  setOpenId: async (openId: string) => {
    setLocalStorage('openId', openId);
    setState('common', {openId})
    return openId;
  },
  setToken: async ( msg: {openId: string, token: string, userInfo: GlobalState['common']['userInfo']} ) => {
    const { openId, token, userInfo } = msg;
    setState('common', {
      openId,
      token: {
        val: token,
        time: +moment().format('x')
      },
      userInfo
    })
  },
  modalOption: async (msg: GlobalState['global']['modalMsg']) => {
    setTimeout(() => {
      setState('global', {modalMsg: msg})
    }, 1)
  }
}
