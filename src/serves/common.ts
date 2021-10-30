import { request } from "@/utils/request";

export const loginServe = (params: IRequest.Common.ILoginParams) => request<IRequest.Common.ILoginRes>('/User/Account/WxMiniProgramLogin', {
  data: params,
  paramsToBigCamel: false
})

export const bindWxPhone = (params: IRequest.Common.BindPhoneParams) => {
  return request<{}, {result: IRequest.Common.BindPhoneRes}>('/User/Account/BindWxMiniProgram', {
    method: 'POST',
    data: params,
    paramsToBigCamel: false,
  })
}