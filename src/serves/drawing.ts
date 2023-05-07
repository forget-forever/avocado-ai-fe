import { request } from "@/utils";


/**
 * 获取模型案例
 * @param query
 * @returns
 */
export function getModelExamples(
  query: API.DrawingPictureQuery,
) {
  return request<API.DrawingPictureDetailInfoVM[]>(
    '/api/drawing/model/example/' + query.modelId,
    {method: 'GET', data: query}
  )
}

/**
 * 获取绘图参数
 * @returns
 */
export function getDrawingParamsVM() {
  return request<API.DrawingParamsVM>('/api/drawing/params', { method: 'GET' })
}

/**
 * 
 * @param model 创建绘图
 * @returns 
 */
export function createDrawing(model: API.CreateDrawingVM) {
  return request<string>('/api/drawing/create', { data: model, method: 'POST' })
}

export const getTags = (tag: string) => {
  return request<string[]>(`/api/drawing/tags/${tag}`, {method: 'GET', data: {tag}})
}

export function getDrawingDetail(pictureId: string) {
  return request<API.DrawingPictureDetailInfoVM>('/api/drawing/detail/' + pictureId, {})
}

/**
 * 购买图片授权
 * @param pictureId
 * @returns
 */
export function buyPictureAction(pictureId: string) {
  return request('/api/drawing/picture/buy/' + pictureId, {method: 'POST'})
}

/**
 * 获取授权列表
 * @param query
 * @returns
 */
export function getOwnershipList(query: API.OwnershipQuery) {
  return request<API.OwnershipInfoVM[]>('/api/user/ownership/list', { data: query })
}
