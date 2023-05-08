import { request } from "@/utils";

export const sendVerifyCodeByOpenId = (data: API.SendVerifyCodeParams) => request<{}>(
  '/User/Account/SendSmsCodeByOpenId',
  {
    method: 'POST',
    data
  }
);

export const bindwxProgramByPhone = (data: API.VerifyCodeBindParams) => request<{}, {result: API.BindPhoneRes}>(
  '/User/Account/BindWxMiniProgramByPhone',
  {
    method: 'POST',
    data
  }
);

/**
 * 每日签到
 * @param signInfo
 * @returns
 */
export function signToday(signInfo: API.SignVM) {
  return request('/api/user/sign', { method: 'POST', data: signInfo })
}

/**
 * 获取消息列表
 * @param query
 * @returns
 */
export function getNotificationList(
  query: ISmallCamel<API.NotificationQuery>,
) {
  return request<API.NotificationInfoVM[]>(
    '/api/user/notification/list',
    { method: 'GET', data: query },
  )
}

/**
 * 通知已读
 * @param notificationId
 * @returns
 */
export function readNotification(notificationId: string) {
  return request<number>('/api/user/notification/read/' + notificationId, {
    method: 'PUT'
  })
}

/**
 * 获取用户状态信息
 * @param isHideLoading
 * @returns
 */
export function getUserStatus() {
  return request<API.UserStatusVM>('/api/user/status', {},)
}