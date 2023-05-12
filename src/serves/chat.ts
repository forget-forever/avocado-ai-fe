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
    { data: model, method: 'POST', showMsg: true },
  )
}

/**
 * 通过conversationId获取绘图细节
 * @param converesationId
 * @returns
 */
export function getAiDrawingDetailsByConversationId(converesationId: string) {
  return request<API.DrawingPictureDetailInfoVM[]>(
    '/api/drawing/conversation/' + converesationId,
    {}
  )
}

/**
 * 获取无水印内容
 * @param model
 * @returns
 */
export async function getContentWithoutWatermark(
  model: API.GetContentWithoutWatermarkVM
) {
  return request<string>('/api/common/noWatermark', { data: model, method: 'POST' })
}

/**
 * 获取无水印内容提取纪录
 * @param contentId
 * @returns
 */
export async function getNoWatermarkContentInfoVM(contentId: string) {
  return request<API.NoWatermarkContentInfoVM>(
    '/api/common/noWatermark/detail/' + contentId,
    { method: 'GET' }
  )
}