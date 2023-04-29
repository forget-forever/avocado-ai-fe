import { getLocalStorage } from "@/utils";

// import dayjs from "dayjs";

// setLocalStorage('info', {openId: 'xxx', token: {val: 'avocadoAi_pToken=c95467d3437644da9eead35baddb2ad8', time: +dayjs().unix()}})
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
