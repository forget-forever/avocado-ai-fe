import { isPhone } from "@/utils/tool"

export const canSubmit = (msg: API.VerifyCodeBindParams) => {
  return isPhone(msg.phone) && msg.smsCode?.length >= 3
}