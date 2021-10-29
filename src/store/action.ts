import { setLocalStorage } from "@/utils/utils"
import { setState } from "."

export const actions = {
  setOpenId: async (openId: string) => {
    setLocalStorage('openId', openId);
    setState('common', {openId})
    return openId;
  }
}
