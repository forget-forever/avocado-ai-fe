import { isPhone } from "@/utils/utils"

export const canSubmit = (msg: IRequest.User.VerifyCodeBindParams) => {
  return isPhone(msg.phone) && msg.verifyCode?.length >= 3
}