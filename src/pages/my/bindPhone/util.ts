import { isPhone } from "@/utils/tool"

export const canSubmit = (msg: User.VerifyCodeBindParams) => {
  return isPhone(msg.phone) && msg.verifyCode?.length >= 3
}