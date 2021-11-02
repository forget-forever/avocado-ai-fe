import { request } from "@/utils/request";

export const loginServe = (params: Common.ILoginParams) => request<Common.ILoginRes>('/User/Account/WxMiniProgramLogin', {
  data: params,
  paramsToBigCamel: false
})

export const bindWxPhone = (params: Common.BindPhoneParams) => {
  return request<{}, {result: Common.BindPhoneRes}>('/User/Account/BindWxMiniProgram', {
    method: 'POST',
    data: params,
    paramsToBigCamel: false,
  })
}