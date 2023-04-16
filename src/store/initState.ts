import { getLocalStorage } from "@/utils";

const info = getLocalStorage('info');
const userInfo = getLocalStorage('userInfo')

const initState: GlobalState = {
  common: {
    userInfo,
    avoSettings: undefined,
    openId: info?.openId,
    token: info?.token,
    themeColor: 'var(--defaultFillColor)'
  },
  global: {
    modalMsg: undefined
  }
}

export default initState;
