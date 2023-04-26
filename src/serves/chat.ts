import { request } from "@/utils";
/**
 * 创建对话
 * @returns
 */
export async function createConversation(
  data: ISmallCamel<API.CreateConversationVM>,
) {
  return request<string>('/api/chat/conversation', { method: 'POST', data })
}

/**
 * 获取对话状态
 * @param coversationId
 * @returns
 */
export function getConversationStatusVM(
  coversationId: string,
) {
  return request<API.ConversationStatusVM>(
    '/api/chat/conversation/status/' + coversationId,
    {},
  )
}

/**
 * 获取对话信息
 * @param coversationId
 * @returns
 */
export function getConversationInfoVM(
  coversationId: string,
) {
  return request<API.ConversationInfoVM>(
    '/api/chat/conversation/' + coversationId,
    {},
  )
}

/**
 * 获取评论列表
 * @param query
 * @param isHideLoading
 * @returns
 */
export function getMessageInfoVMList(
  query: API.MessageInfoQuery,
) {
  return request<API.MessageInfoVM[]>(
    '/api/chat/conversation/message/list',
    { method:'GET', data: query },
  )
}

/**
 * 发送对话
 * @param model
 * @returns
 */
export function sendMessage(model: ISmallCamel<API.SendMessageVM>) {
  return request<API.MessageInfoVM>(
    '/api/chat/conversation/message',
    { data: model, method: 'POST' },
  )
}
