import { getLocalStorage } from "@/utils";

// import dayjs from "dayjs";

// setLocalStorage('info', { token: {val: 'avocadoAi_pToken=9d6287cddc35482a95a999a9d15c6a1d', time: +dayjs().unix()}})
const info = getLocalStorage('info');
const userInfo = getLocalStorage('userInfo')

const initState: GlobalState = {
  common: {
    userInfo,
    avoSettings: undefined,
    // openId: info?.openId,
    token: info?.token,
    themeColor: 'var(--defaultFillColor)'
  },
  global: {
    modalMsg: undefined
  }
}

export default initState;
