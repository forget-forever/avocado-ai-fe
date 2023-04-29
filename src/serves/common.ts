import { request } from "@/utils";

export const loginServe = (params: ISmallCamel< API.ILoginParams>) => request<API.ILoginRes>('/api/user/wxMini/login', {
  data: params,
  method: 'POST'
})

export const bindWxPhone = (params: API.BindPhoneParams) => {
  return request<{}, {result: API.BindPhoneRes}>('/User/Account/BindWxMiniProgram', {
    method: 'POST',
    data: params,
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