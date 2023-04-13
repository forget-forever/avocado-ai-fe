import { request } from "@/utils/request";
/**
 * 获取图像验证码
 * @returns
 */
export function getGraphicValidate() {
  return request<ValidateGraphic>('/api/common/graphicCode', { method: 'GET' })
}
/**
 * 验证图像验证码
 * @param model
 * @returns
 */
export function validateGraphicCode(model: any) {
  return request<string>('/api/common/graphicCode', { method: 'GET' })
}
/**
 * 获取牛油果的信息
 * @returns
 */
export function getAvocadaInfoVM() {
  return request<AvocadoInfoVM>('/api/common/avocadoInfo', { method: 'GET' })
}
/**
 * 获取验证手机的奖励次数
 * @returns
 */
export function getVerifyPhoneRewardCount() {
  return request<string>('/api/common/verifyPhoneRewardCount', {})
}
/**
 * 每条消息需要扣除的次数
 * @returns
 */
export function getMessageCost() {
  return request<string>('/api/common/messageCost', {})
}
/**
 * 获取套餐
 * @returns
 */
export function getOrderPackages() {
  return request<string[][]>('/api/common/orderPackages', {})
}

/**
 * 获取字典列表
 * @param query
 * @param loading
 * @returns
 */
export async function getDicInfoList(query: DicInfoQuery) {
  return request<CI_DicInfo[]>('/api/admin/common/dic/list2', { method: 'GET', data: query })
}
/**
 * 获取字典的domain列表
 * @returns
 */
export async function getDicDomainList() {
  return request<string[]>('/api/admin/common/dic/domains')
}
/**
 * 新增字典信息
 * @param model
 * @returns
 */
export async function addDicInfo(model: AddDicInfoVM) {
  return request('/api/admin/common/dic', { method: 'POST', data: model })
}
/**
 * 编辑字典信息
 * @param model
 * @returns
 */
export async function updateDicInfo(model: UpdateDicInfoVM) {
  return request('/api/admin/common/dic', { method: 'PUT', data: model })
}
/**
 * 删除字典信息
 * @param id
 * @returns
 */
export async function deleteDicInfo(id: number) {
  return request('/api/admin/common/dic/' + id, { method: 'DELETE' })
}
/**
 * 获取字典信息
 * @param id
 * @returns
 */
export async function getDicInfo(id: number) {
  return request<CI_DicInfo>('/api/admin/common/dic/' + id)
}
export async function uploadFileToAliyunOss(data: AliyunOSSUploadFileVM) {
  return request<AliyunOSSUploadFileVM>(data.host,  { data, method: 'POST' })
}
/**
 * 获取无水印内容
 * @param model
 * @returns
 */
export async function getContentWithoutWatermark(
  model: GetContentWithoutWatermarkVM
) {
  return request('/api/common/noWatermark', { data: model, method: 'POST' })
}
/**
 * 获取无水印内容提取纪录
 * @param contentId
 * @returns
 */
export async function getNoWatermarkContentInfoVM(contentId: string) {
  return request<NoWatermarkContentInfoVM>(
    '/api/common/noWatermark/detail/' + contentId,
    { method: 'GET' }
  )
}
