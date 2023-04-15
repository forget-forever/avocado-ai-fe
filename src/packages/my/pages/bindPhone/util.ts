import { isPhone } from "@/utils"

export const canSubmit = (msg: API.VerifyCodeBindParams) => {
  return isPhone(msg.phone) && msg.smsCode?.length >= 3
}