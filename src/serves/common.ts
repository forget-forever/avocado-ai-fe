import { request } from "@/utils/request";

export const loginServe = (params: API.ILoginParams) => request<API.ILoginRes>('/User/Account/WxMiniProgramLogin', {
  data: params,
  paramsToBigCamel: false
})

export const bindWxPhone = (params: API.BindPhoneParams) => {
  return request<{}, {result: API.BindPhoneRes}>('/User/Account/BindWxMiniProgram', {
    method: 'POST',
    data: params,
    paramsToBigCamel: false,
  })
}