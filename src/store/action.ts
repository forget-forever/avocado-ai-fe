import { delay, setLocalStorage } from "@/utils"
import dayjs from "dayjs";
import { getAvocadaInfoVM, getUserInfo, getUserStatus } from '@/serves'
import { hideTabBarRedDot, showTabBarRedDot } from "@tarojs/taro";
import { inTabBarPage } from "@/router/routerMap";
import { setState } from "."


let ModalInstance: undefined | ((msg?: GlobalState['global']['modalMsg']) => Promise<void> )

let stausTimeout: NodeJS.Timeout;

export const actions = {
  setToken: async ( msg: {token: string}) => {
    const {token } = msg;
    const tokenData = { val: token, time: +dayjs().unix() };
    setLocalStorage('info', { token: tokenData });
    await delay(100)
    await actions.getUserInfo()
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
    await ModalInstance?.(msg)
  },
  /**
   * 获取用户信息
   */
  getUserInfo: async () => {
    const [res, avoRes] = await Promise.all([getUserInfo(), getAvocadaInfoVM() ])
    setState('common', { userInfo: res, avoSettings: avoRes });
    setLocalStorage('userInfo', res)
    return res
  },
  /**
   * 检查信息状态
   */
  checkStatus: async () => {
    clearTimeout(stausTimeout)
    const res = await getUserStatus()
    if (inTabBarPage()) {
      if (res.hasUnreadNotification) {
        showTabBarRedDot({index: 1})
      } else {
        hideTabBarRedDot({index: 1})
      }
    }
    stausTimeout = setTimeout(actions.checkStatus, 3000)
    return res
  },
  /**
   * 错误提示
   */
  showErrorToast: <T extends {message?: string}>(err?: null | T | T[]) => {
    let tipMsg = ''
    if (Array.isArray(err)) {
      tipMsg = err[0]?.message || ''
    } else {
      tipMsg = err?.message || ''
    }
    if (!tipMsg) {
      return
    }
    actions.modalOption?.({
      title: '提示',
      content: tipMsg,
      hidePassiveButton: true,
      positiveText: '我知道了'
    })
  }
}
