import { request } from "@/utils";

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

export const getUserInfo = () => {
  return request<API.UserInfo>('/api/User/userInfo', { method: 'GET' })
}

/**
 * 获取牛油果的信息
 * @returns
 */
export function getAvocadaInfoVM() {
  return request<API.AvocadoInfoVM>('/api/common/avocadoInfo', { method: 'GET' })
}